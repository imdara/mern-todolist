import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: String,
  status: Boolean,
  author: String,
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
