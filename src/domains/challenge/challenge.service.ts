import { prisma } from "../../core/db";

type Create = {
  data: {
    title: string;
    description: string;
    userId: string;
    pointReward: number;
    requirement: string;
  };
};

class Service {
  async create({
    data: { title, description, userId, pointReward, requirement },
  }: Create) {
    return prisma.challenge.create({
      data: {
        title,
        description,
        userId,
        pointReward,
        requirement,
      },
    });
  }

  async update({
    id,
    data: { title, description, userId, pointReward, requirement },
  }: {
    id: string;
    data: {
      title?: string;
      description?: string;
      userId?: string;
      pointReward?: number;
      requirement?: string;
    };
  }) {
    return prisma.challenge.update({
      where: { id },
      data: {
        title,
        description,
        userId,
        pointReward,
        requirement,
      },
    });
  }

  async delete(id: string) {
    return prisma.challenge.delete({
      where: { id },
    });
  }

  async findById(id: string) {
    return prisma.challenge.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async findAll() {
    return prisma.challenge.findMany({
      include: {
        user: true,
      },
    });
  }
}

export const challengeService = new Service();
