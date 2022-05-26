import { Router } from "express";
import {
  getAllTodos,
  addTodo,
  editTodo,
  deleteTodo,
} from "../controllers/todosController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
  .get("/", authMiddleware, getAllTodos)
  .post("/", authMiddleware, addTodo)
  .put("/:id", authMiddleware, editTodo)
  .delete("/:id", authMiddleware, deleteTodo);

export default router;
