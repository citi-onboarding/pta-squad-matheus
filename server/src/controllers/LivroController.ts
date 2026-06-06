import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import prisma from "@database";

class LivroController implements Crud {
  constructor(private readonly citi = new Citi("Livro")) { }

  criar = async (request: Request, response: Response) => {
    const { titulo, autor, isbn, editora, ano, quantidadeTotal, categoria, capa } =
      request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(
      titulo,
      autor,
      isbn,
      editora,
      ano,
      quantidadeTotal,
      categoria
    );
    if (isAnyUndefined) return response.status(400).send();

    const novoLivro = {
      titulo,
      autor,
      isbn,
      editora,
      ano,
      quantidadeTotal,
      quantidadeDisponivel: quantidadeTotal,
      categoria,
      ...(capa ? { capa } : {}),
    };

    const { httpStatus, value } = await this.citi.insertIntoDatabase(novoLivro);

    return response.status(httpStatus).send(value);
  };

  listar = async (request: Request, response: Response) => {
    const { httpStatus, values } = await this.citi.getAll();

    return response.status(httpStatus).send(values);
  };

  buscarPorId = async (request: Request, response: Response) => {
    const { id } = request.params;

    try {
      const livro = await prisma.livro.findUnique({
        where: { id },
        include: { emprestimos: true }, // <- a única diferença
      });

      if (!livro) return response.status(404).send();

      return response.status(200).send(livro);
    } catch (error) {
      return response.status(400).send();
    }
  };

  excluir = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };
}

export default new LivroController();
