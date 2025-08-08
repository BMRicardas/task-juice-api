import { Request, Response } from "express";
import { userService } from "./users.service";

class Controller {
  async register(req: Request, res: Response, next: Function) {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const user = await userService.register({ data: { email, password } });
      console.log("HERE");
      res.status(201).json({
        status: "success",
        data: { user },
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
    } finally {
      next();
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userService.login({ data: { email, password } });

      res.status(200).json({
        status: "success",
        data: { user },
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

  async getUsers(_req: Request, res: Response) {
    try {
      const users = await userService.getUsers();

      res.status(200).json({
        status: "success",
        results: users.length,
        data: { users },
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

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userService.getUserById({ data: { id } });

      res.status(200).json(user);
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

export const userController = new Controller();
