import { prisma } from "../../core/db";
import { bcryptService, jwtService } from "../../tools";

type Register = {
  data: { email: string; password: string };
};

type Login = {
  data: { email: string; password: string };
};

type GetUserById = {
  data: {
    id: string;
  };
};

export class Service {
  async register({ data: { email, password } }: Register) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcryptService.hash(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    const token = jwtService.generateToken(user);

    return {
      data: user,
      token,
    };
  }

  async login({ data: { email, password } }: Login) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcryptService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const baseUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      collectedPoints: user.collectedPoints,
    };

    return baseUser;
  }

  async getUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }

  async getUserById({ data: { id } }: GetUserById) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}

export const userService = new Service();
