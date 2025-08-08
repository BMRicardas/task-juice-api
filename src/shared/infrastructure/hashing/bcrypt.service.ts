import * as bcrypt from "bcryptjs";

class BcryptService {
  async hash(plainText: string) {
    return await bcrypt.hash(plainText, Number(process.env.SALT_ROUNDS));
  }

  async compare(plainText: string, hash: string) {
    return await bcrypt.compare(plainText, hash);
  }
}

export const bcryptService = new BcryptService();
