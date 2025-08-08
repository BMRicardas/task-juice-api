import express from "express";
import { userController } from "./users.controller";

export const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

// Add auth middleware here if needed

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
