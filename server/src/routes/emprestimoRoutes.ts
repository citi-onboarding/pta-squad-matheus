import express from "express";
import emprestimoController from "../controllers/emprestimoController";

const emprestimoRoutes = express.Router();

emprestimoRoutes.post("/", emprestimoController.criar);
emprestimoRoutes.get("/", emprestimoController.listar);
emprestimoRoutes.get("/:id", emprestimoController.buscarPorId);
emprestimoRoutes.put("/:id", emprestimoController.devolver);
emprestimoRoutes.delete("/:id", emprestimoController.cancelar);
emprestimoRoutes.post("/:id/lembrete", emprestimoController.enviarLembrete);

export default emprestimoRoutes;
