import express from "express";
import { userController } from "./users.controller";

export const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
