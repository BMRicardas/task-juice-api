import express from "express";
import { taskController } from "./tasks.controller";

export const taskRouter = express.Router();

taskRouter.post("/", taskController.create);
taskRouter.put("/:id", taskController.update);
taskRouter.delete("/:id", taskController.delete);

taskRouter.get("/", taskController.getTasks);
taskRouter.get("/:id", taskController.getTaskById);
