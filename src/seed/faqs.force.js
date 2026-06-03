import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import { FRONTEND_PAGES } from "../constants/pages.js";
import { Page } from "../models/Page.js";
import { defaultFaqSections } from "./pages.seed.js";

/**
 * One-off script: force-overwrite the `faqs` page's sections with the v2
 * content from defaultFaqSections, regardless of any existing content.
 *
 * Usage (from hallpark-backend/):
 *   node src/seed/faqs.force.js
 */
async function run() {
  await connectDb();

  const meta = FRONTEND_PAGES.find((p) => p.slug === "faqs");

  const result = await Page.findOneAndUpdate(
    { slug: "faqs" },
    {
      $set: { sections: defaultFaqSections, published: true },
      $setOnInsert: {
        slug: "faqs",
        name: meta?.name ?? "FAQs",
        path: meta?.path ?? "/faqs",
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  const categories = result?.sections?.faqCategories ?? [];
  const itemCount = categories.reduce((acc, c) => acc + (c.items?.length ?? 0), 0);

  console.log("✓ FAQ v2 content written to the `faqs` page.");
  console.log(`  categories: ${categories.length}`);
  console.log(`  items:      ${itemCount}`);
  console.log(`  published:  ${result?.published}`);
}

run()
  .catch((err) => {
    console.error("✗ Failed to seed FAQ v2 content:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
