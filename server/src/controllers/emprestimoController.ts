// emprestimoController.ts

import { Request, Response } from 'express';
import { Citi, Crud } from "../global";
import prisma from "@database";
import { enviarLembrete } from "../services/emailService";
import { StatusEmprestimo } from '@prisma/client'

const citiEmprestimo = new Citi("Emprestimo");
const citiLivro = new Citi("Livro");

class EmprestimoController implements Crud {
    constructor(private readonly citi = new Citi("Emprestimo")) { }

    criar = async (request: Request, response: Response) => {
        const { livroId, nomeCliente, emailCliente, dataLocacao, dataPrevistaDevolucao } = request.body

        const isAnyUndefined = citiEmprestimo.areValuesUndefined(
            livroId, nomeCliente, emailCliente, dataLocacao, dataPrevistaDevolucao
        )
        if (isAnyUndefined) return response.status(400).send()

        const livro = await prisma.livro.findUnique({ where: { id: livroId } })
        if (!livro || livro.quantidadeDisponivel <= 0) {
            return response.status(409).send({ error: 'Este livro não está disponível' })
        }

        try {
            const novoEmprestimo = await prisma.emprestimo.create({
                data: {
                    livro: { connect: { id: livroId } },
                    nomeCliente,
                    emailCliente,
                    dataLocacao: new Date(dataLocacao),
                    dataPrevistaDevolucao: new Date(dataPrevistaDevolucao),
                    status: StatusEmprestimo.EM_ANDAMENTO, // <- era 'EM_ANDAMENTO' (string)
                }
            })

            await prisma.livro.update({
                where: { id: livroId },
                data: { quantidadeDisponivel: livro.quantidadeDisponivel - 1 }
            })

            return response.status(201).send(novoEmprestimo)
        } catch (error) {
            return response.status(400).send()
        }
    }

    listar = async (request: Request, response: Response) => {
        const { httpStatus, values } = await citiEmprestimo.getAll();

        const emprestimosComAtraso = values.map((emp: any) => {
            const estaAtivo = emp.status === 'EM_ANDAMENTO';
            const prazoVencido = new Date(emp.dataPrevistaDevolucao) < new Date();

            return {
                ...emp,
                atrasado: estaAtivo && prazoVencido
            };
        });

        return response.status(httpStatus).send(emprestimosComAtraso);
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