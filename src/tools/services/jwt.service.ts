import jwt from "jsonwebtoken";
import type { VerifyOptions, SignOptions } from "jsonwebtoken";
import { env } from "../../core";
import { BaseUser } from "../../domains/users/users.types";

class JwtService {
  generateToken(payload: BaseUser, options?: SignOptions) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: `${env.JWT_EXPIRES_IN_DAYS}d`,
      ...options,
    });
  }

  verifyToken(token: string, options: VerifyOptions) {
    try {
      return jwt.verify(token, env.JWT_SECRET, options);
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  }
}

export const jwtService = new JwtService();
