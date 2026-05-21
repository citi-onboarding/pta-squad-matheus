import express from "express";
import livroController from "../controllers/LivroController";

const livroRoutes = express.Router();

livroRoutes.post("/", livroController.criar);
livroRoutes.get("/", livroController.listar);
livroRoutes.get("/:id", livroController.buscarPorId);
livroRoutes.delete("/:id", livroController.excluir);

export default livroRoutes;
