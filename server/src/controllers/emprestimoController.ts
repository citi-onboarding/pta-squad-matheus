import { Request, Response } from 'express';
import { Citi, Crud } from "../global";
// Importando o prisma para fazer a busca de alta performance com JOIN
import prisma from "@database";
import { enviarLembrete } from "../services/emailService";

const citiEmprestimo = new Citi("Emprestimo");
const citiLivro = new Citi("Livro");

class EmprestimoController implements Crud {
    constructor(private readonly citi = new Citi("Emprestimo")) { }

    criar = async (request: Request, response: Response) => {
        const { livroId, nomeCliente, emailCliente, dataLocacao, dataPrevistaDevolucao } = request.body;

        const isAnyUndefined = citiEmprestimo.areValuesUndefined(livroId, nomeCliente, emailCliente, dataLocacao, dataPrevistaDevolucao);
        if (isAnyUndefined) return response.status(400).send();

        const { value: livro } = await citiLivro.findById(livroId);
        if (!livro || livro.quantidadeDisponivel <= 0) {
            return response.status(409).send({ error: 'Este livro não possui unidades disponíveis' });
        }

        const novoEmprestimo = {
            livroId,
            nomeCliente,
            emailCliente,
            dataLocacao: new Date(dataLocacao),
            dataPrevistaDevolucao: new Date(dataPrevistaDevolucao),
            status: 'EM_ANDAMENTO'
        };

        const { httpStatus, value } = await citiEmprestimo.insertIntoDatabase(novoEmprestimo);

        await citiLivro.updateValue(livroId, { quantidadeDisponivel: livro.quantidadeDisponivel - 1 });

        return response.status(httpStatus).send(value);
    }

    // NOVO MÉTODO LISTAR 
    listar = async (request: Request, response: Response) => {
        try {
            const nomePesquisado = request.query.nome as string;

            const pagina = Number(request.query.pagina) || 1;
            const limite = Number(request.query.limite) || 15;
            const pularRegistros = (pagina - 1) * limite;

            const emprestimos = await prisma.emprestimo.findMany({
                where: nomePesquisado ? {
                    nomeCliente: {
                        contains: nomePesquisado,
                        mode: 'insensitive'
                    }
                } : undefined,

                include: {
                    livro: true
                },
                take: limite,
                skip: pularRegistros,
                orderBy: {
                    dataLocacao: 'desc'
                }
            });

            const emprestimosComAtraso = emprestimos.map((emprestimo) => {
                const estaAtivo = emprestimo.status === 'EM_ANDAMENTO';
                const prazoVencido =
                    new Date(emprestimo.dataPrevistaDevolucao) < new Date();

                return {
                    ...emprestimo,
                    atrasado: estaAtivo && prazoVencido
                };
            });

            const total = await prisma.emprestimo.count({
                where: nomePesquisado ? {
                    nomeCliente: {
                        contains: nomePesquisado,
                        mode: 'insensitive'
                    }
                } : undefined
            });

            return response.status(200).json({
                total,
                data: emprestimosComAtraso
            });


        } catch (error) {
            console.error("Erro na busca paginada:", error);
            return response.status(500).json({ error: "Erro interno ao listar empréstimos" });
        }
    }

    buscarPorId = async (request: Request, response: Response) => {
        const { id } = request.params;
        const { httpStatus, value: emprestimo } = await citiEmprestimo.findById(id);

        if (!emprestimo) {
            return response.status(404).send({ error: 'Empréstimo não encontrado' });
        }

        const estaAtivo = emprestimo.status === 'EM_ANDAMENTO';
        const prazoVencido = new Date(emprestimo.dataPrevistaDevolucao) < new Date();

        const emprestimoComAtraso = {
            ...emprestimo,
            atrasado: estaAtivo && prazoVencido
        };

        return response.status(httpStatus).send(emprestimoComAtraso);
    }

    devolver = async (request: Request, response: Response) => {
        const { value: emprestimo } = await citiEmprestimo.findById(request.params.id);

        if (!emprestimo) return response.status(404).send();

        if (emprestimo.status === 'DEVOLVIDO') {
            return response.status(400).send({
                error: 'Este empréstimo já foi devolvido'
            });
        }

        await citiEmprestimo.updateValue(request.params.id, { status: 'DEVOLVIDO' });

        const { value: livro } = await citiLivro.findById(emprestimo.livroId);
        if (livro) {
            await citiLivro.updateValue(emprestimo.livroId, {
                quantidadeDisponivel: livro.quantidadeDisponivel + 1,
            });
        }

        return response.status(200).send({ message: 'Devolução registrada com sucesso!' });
    }

    cancelar = async (request: Request, response: Response) => {
        const { id } = request.params;

        const { value: emprestimo } = await citiEmprestimo.findById(id);
        if (!emprestimo) {
            return response.status(404).send({ error: 'Empréstimo não encontrado' });
        }

        const { httpStatus } = await citiEmprestimo.deleteValue(id);

        const { value: livro } = await citiLivro.findById(emprestimo.livroId);
        if (livro) {
            await citiLivro.updateValue(emprestimo.livroId, {
                quantidadeDisponivel: livro.quantidadeDisponivel + 1,
            });
        }

        return response.status(httpStatus).send({
            message: 'Empréstimo cancelado e estoque restaurado com sucesso!'
        });
    }

    enviarLembrete = async (request: Request, response: Response) => {
        const { id } = request.params;
        if (!id) return response.status(400).send({ error: 'ID inválido' });

        const emprestimo = await prisma.emprestimo.findFirst({
            where: { id },
            include: { livro: true },
        });

        if (!emprestimo) {
            return response.status(404).send({ error: 'Empréstimo não encontrado' });
        }

        if (emprestimo.status !== 'EM_ANDAMENTO') {
            return response.status(400).send({ error: 'Empréstimo já foi devolvido' });
        }

        if (new Date(emprestimo.dataPrevistaDevolucao) >= new Date()) {
            return response.status(400).send({ error: 'Empréstimo não está atrasado' });
        }

        try {
            await enviarLembrete(
                emprestimo.emailCliente,
                emprestimo.nomeCliente,
                emprestimo.livro.titulo,
                emprestimo.dataPrevistaDevolucao.toISOString()
            );
            return response.status(200).send({ message: 'Lembrete enviado com sucesso' });
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            return response.status(500).send({ error: 'Erro ao enviar lembrete' });
        }
    }
}

export default new EmprestimoController();