/**
 * Non-destructive seed for the Home page "Services" (goodLookingServices) cards.
 *
 * The home Services section now has its OWN editable card list (independent of
 * the Services page). These 10 cards were previously hardcoded on the frontend
 * (with videos); this seeds them into the DB so they're CMS-managed.
 *
 * Safe by design:
 *   • Reads the existing "home" page first.
 *   • $sets ONLY sections.goodLookingServices.cards — preserving the section's
 *     heading / CTAs / parkingIntegrations and every other home section.
 *   • Skips writing if cards already exist (unless --force).
 *
 * Run:  node src/seed/home-service-cards.force.js          (dry run / preview)
 *       node src/seed/home-service-cards.force.js --apply   (write to DB)
 *       node src/seed/home-service-cards.force.js --apply --force  (overwrite existing cards)
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Page } from "../models/Page.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CARDS = JSON.parse(fs.readFileSync(path.join(__dirname, "home-service-cards.data.json"), "utf8"));

const APPLY = process.argv.includes("--apply");
const FORCE = process.argv.includes("--force");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB\n");

  const page = await Page.findOne({ slug: "home" });
  if (!page) {
    console.error("❌ 'home' page not found.");
    await mongoose.connection.close();
    process.exit(1);
  }

  const gls = page.sections?.goodLookingServices ?? {};
  const existing = Array.isArray(gls.cards) ? gls.cards : [];

  console.log("=== PLAN ===");
  console.log(`goodLookingServices.cards: ${existing.length} → ${CARDS.length}`);
  console.log("Cards to seed:");
  CARDS.forEach((c, i) => console.log(`  ${String(i + 1).padStart(2)}. ${c.name}  [${c.mediaType}]`));
  console.log("\nPreserved: heading, CTAs, parkingIntegrations, and all other home sections.");

  if (existing.length > 0 && !FORCE) {
    console.log(`\n⚠️  ${existing.length} card(s) already exist. Re-run with --force to overwrite. (Not writing.)`);
    await mongoose.connection.close();
    return;
  }

  if (!APPLY) {
    console.log("\nℹ️  DRY RUN. Re-run with --apply to write.");
    await mongoose.connection.close();
    return;
  }

  await Page.updateOne(
    { slug: "home" },
    { $set: { "sections.goodLookingServices.cards": CARDS } },
  );

  console.log("\n✅ APPLIED — home goodLookingServices.cards set. Nothing else changed.");
  await mongoose.connection.close();
  console.log("Database connection closed");
}

run().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
