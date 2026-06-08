import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { seedPages } from "./seed/pages.seed.js";

async function start() {
  await connectDb();
  await seedPages();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`HalaPark API running on http://localhost:${env.port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
