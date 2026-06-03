import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import pagesRoutes from "./routes/pages.routes.js";
import quotesRoutes from "./routes/quotes.routes.js";
import adminRoutes from "./routes/admin.routes.js";

export function createApp() {
  const app = express();
  const allowAllOrigins = env.corsOrigins.includes("*");

  app.use(helmet());
  app.use(
    cors({
      // If CORS_ORIGINS includes "*", reflect any origin.
      origin: allowAllOrigins ? true : env.corsOrigins,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "2mb" }));

  if (env.nodeEnv !== "test") {
    app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));
  }

  app.get("/", (_req, res) => {
    res.json({ message: "HalaPark API", version: "2.0.0" });
  });

  app.use("/api/health", healthRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/pages", pagesRoutes);
  app.use("/api/quotes", quotesRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
