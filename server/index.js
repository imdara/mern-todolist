// importing modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
config();

// importing routes
import usersRoute from "./routes/users.js";
import todosRoute from "./routes/todos.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// implementing routes
app.use("/api/auth", usersRoute);
app.use("/api/todos", todosRoute);

app.use(express.static("build"));

app.get("/", (req, res) => res.sendFile("./public/index.html"));

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE_URL || "mongodb://localhost/mydb", {
    useNewUrlParser: true,
  })
  .then(app.listen(PORT, () => console.log("Connected to the database")))
  .catch((err) => console.log(err));
