import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class LivroController implements Crud {
  constructor(private readonly citi = new Citi("Livro")) {}

  criar = async (request: Request, response: Response) => {
    const { titulo, autor, isbn, editora, ano, quantidadeTotal, categoria } =
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

    const { httpStatus, value } = await this.citi.findById(id);
    if (value === undefined) return response.status(404).send();

    return response.status(httpStatus).send(value);
  };

  excluir = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };
}

export default new LivroController();
