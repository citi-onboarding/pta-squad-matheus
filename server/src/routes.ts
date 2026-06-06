import express from "express";
import userController from "./controllers/UserController";
import livroRoutes from "./routes/livroRoutes";
import emprestimoRoutes from "./routes/emprestimoRoutes";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);
routes.use("/api/livros", livroRoutes);
routes.use("/api/emprestimos", emprestimoRoutes);
export default routes;
