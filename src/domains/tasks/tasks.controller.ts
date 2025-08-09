import { Request, Response } from "express";
import { taskService } from "./tasks.service";

class Controller {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    // @ts-expect-error
    const { id } = req.user;

    try {
      const task = await taskService.create({
        // @ts-expect-error
        data: { title, description, id },
      });

      res.status(201).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "An unexpected error occurred",
        });
      }
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
      const task = await taskService.update({
        data: { id, title, description },
      });

      res.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "An unexpected error occurred",
        });
      }
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const task = await taskService.delete({ data: { id } });

      res.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "An unexpected error occurred",
        });
      }
    }
  }

  async getTasks(req: Request, res: Response) {
    try {
      const tasks = await taskService.getTasks();

      res.status(200).json({
        status: "success",
        results: tasks.length,
        data: { tasks },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "An unexpected error occurred",
        });
      }
    }
  }

  async getTaskById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const task = await taskService.getTaskById({ data: { id } });

      res.status(200).json({
        status: "success",
        data: { task },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "An unexpected error occurred",
        });
      }
    }
  }
}

export const taskController = new Controller();
