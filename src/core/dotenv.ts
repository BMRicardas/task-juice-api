import { config } from "dotenv";

config();

function validateEnv(variable: string): string {
  const value = process.env[variable];

  if (!value) {
    throw new Error(`Environment variable ${variable} is not defined`);
  }

  return value;
}

export const env = {
  PORT: Number(validateEnv("PORT")),
  DATABASE_URL: validateEnv("DATABASE_URL"),
  SALT_ROUNDS: Number(validateEnv("SALT_ROUNDS")),
  JWT_SECRET: validateEnv("JWT_SECRET"),
  JWT_EXPIRES_IN_DAYS: Number(validateEnv("JWT_COOKIE_EXPIRES_IN_DAYS")),
};
