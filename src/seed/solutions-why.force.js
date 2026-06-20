/**
 * Seed ONLY the Solutions page "why" section with its full default content, so
 * the frontend can render purely from CMS (no hardcoded fallbacks).
 *
 * Scope-safe: $sets ONLY `sections.why` and touches NOTHING else on the page.
 * It merges the defaults UNDER the existing why values, so anything already
 * edited in the admin (heading/headingGradient) is preserved.
 *
 * Run:  node src/seed/solutions-why.force.js          (dry run)
 *       node src/seed/solutions-why.force.js --apply    (write)
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";

dotenv.config();

const DEFAULT_WHY = {
  heading: "Why Leading Developments Choose Halapark?",
  headingGradient: "Choose Halapark?",
  points: [
    "End-to-end parking automation",
    "Real-time operational visibility",
    "Scalable multi-site infrastructure",
    "Seamless user experience",
    "Built for UAE smart city standards",
  ],
  image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
  badge: "Live Operations",
  panelTitle: "Control room visibility",
  panelTitleAccent: "across every site.",
};

const APPLY = process.argv.includes("--apply");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB\n");

  const page = await Page.findOne({ slug: "solutions" });
  if (!page) {
    console.error("❌ 'solutions' page not found.");
    await mongoose.connection.close();
    process.exit(1);
  }

  const cur = page.sections?.why ?? {};
  // Defaults UNDER existing → keep any admin edits; only fill in missing keys.
  const merged = { ...DEFAULT_WHY, ...cur };
  // points: keep existing only if it's a non-empty array, else use default.
  merged.points = Array.isArray(cur.points) && cur.points.length > 0 ? cur.points : DEFAULT_WHY.points;

  console.log("=== PLAN (sections.why only) ===");
  console.log("heading:           ", merged.heading);
  console.log("headingGradient:   ", merged.headingGradient);
  console.log("points:            ", merged.points.length, "item(s)");
  console.log("image:             ", merged.image);
  console.log("badge:             ", merged.badge);
  console.log("panelTitle/accent: ", merged.panelTitle, "/", merged.panelTitleAccent);
  console.log("\nNothing else on the page is touched.");

  if (!APPLY) {
    console.log("\nℹ️  DRY RUN. Re-run with --apply to write.");
    await mongoose.connection.close();
    return;
  }

  await Page.updateOne({ slug: "solutions" }, { $set: { "sections.why": merged } });
  console.log("\n✅ APPLIED — sections.why seeded. Existing why edits preserved; nothing else changed.");
  await mongoose.connection.close();
  console.log("Database connection closed");
}

run().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
