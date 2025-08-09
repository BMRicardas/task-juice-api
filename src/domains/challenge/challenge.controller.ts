import express from "express";
import { challengeService } from "./challenge.service";

const router = express.Router();

class Controller {
  async create(req: express.Request, res: express.Response) {
    const { title, description, userId, pointReward, requirement } = req.body;
    const challenge = await challengeService.create({
      data: { title, description, userId, pointReward, requirement },
    });
    res.status(201).json(challenge);
  }

  async update(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const { title, description, userId, pointReward, requirement } = req.body;
    const challenge = await challengeService.update({
      id,
      data: { title, description, userId, pointReward, requirement },
    });
    res.json(challenge);
  }

  async delete(req: express.Request, res: express.Response) {
    const { id } = req.params;
    await challengeService.delete(id);
    res.status(204).send();
  }

  async findById(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const challenge = await challengeService.findById(id);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }
    res.json(challenge);
  }
  async findAll(req: express.Request, res: express.Response) {
    const challenges = await challengeService.findAll();
    res.json(challenges);
  }
}

export const challengeController = new Controller();
