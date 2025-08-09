import { prisma } from "../../core/db";

type Create = {
  data: { title: string; description: string; userId: string };
};

type Update = {
  data: { id: string; title?: string; description?: string };
};

type Delete = {
  data: { id: string };
};

type GetTaskById = {
  data: { id: string };
};

type GetTasksByUserId = {
  data: { id: string };
};

class Service {
  async create({ data: { title, description, userId } }: Create) {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        user: {
          connect: { id: userId },
        },
      },
    });

    return task;
  }

  async update({ data: { id, title, description } }: Update) {
    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    return task;
  }

  async delete({ data: { id } }: Delete) {
    const task = await prisma.task.delete({
      where: { id },
    });

    return task;
  }

  async getTasks() {
    const tasks = await prisma.task.findMany();

    return tasks;
  }

  async getTaskById({ data: { id } }: GetTaskById) {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async getTasksByUserId({ data: { id } }: GetTasksByUserId) {
    const tasks = await prisma.task.findMany({
      where: { id },
    });

    return tasks;
  }
}

export const taskService = new Service();
