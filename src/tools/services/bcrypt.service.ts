import { hash, compare } from "bcryptjs";
import { env } from "../../core";

class BcryptService {
  async hash(plainText: string) {
    return await hash(plainText, Number(env.SALT_ROUNDS));
  }

  async compare(plainText: string, hash: string) {
    return await compare(plainText, hash);
  }
}

export const bcryptService = new BcryptService();
