import Todo from "../models/todo.js";

export const getAllTodos = async (req, res) => {
  const { name } = req.user;
  const todos = await Todo.find({ author: name });
  res.status(200).send({ name, todos });
};

export const addTodo = async (req, res) => {
  const { name } = req.user;
  const { todo } = req.body;
  await Todo.create({ todo, status: false, author: name });
  res.status(201).send("Todo added successfully");
};

export const editTodo = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Todo.findByIdAndUpdate(id, { status });
  status
    ? res.status(201).send("Task completed successfully")
    : res.status(201).send("Task not completed");
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(201).send("Todo deleted successfully");
};
