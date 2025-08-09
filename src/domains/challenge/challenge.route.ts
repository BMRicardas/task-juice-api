import express from "express";
import { challengeController } from "./challenge.controller";

export const challengeRouter = express.Router();

challengeRouter.post("/", challengeController.create);
challengeRouter.put("/:id", challengeController.update);
challengeRouter.delete("/:id", challengeController.delete);

challengeRouter.get("/", challengeController.findAll);
challengeRouter.get("/:id", challengeController.findById);
