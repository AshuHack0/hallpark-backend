import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/hallpark",
  jwtSecret: process.env.JWT_SECRET ?? "dev-jwt-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:3000,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
