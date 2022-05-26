import { Router } from "express";
import { logUserIn, signUserUp } from "../controllers/usersController.js";

const router = Router().post("/login", logUserIn).post("/signup", signUserUp);

export default router;
