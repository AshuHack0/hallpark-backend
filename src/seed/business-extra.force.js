/**
 * Non-destructive seed for the NEW editable Business-page sections so the admin
 * fields show real, editable values instead of placeholders.
 *
 * Seeds (only if the section is missing — never overwrites real edits):
 *   • solutionsHeader, valueProps, whoItsFor, howToGetStarted
 *   • cta.heading / headingAccent / ctaLabel / ctaLink — added alongside the
 *     existing cta.description / cta.image. If cta.heading is absent but the old
 *     cta.title exists, title is migrated into heading.
 *
 * Run:  node src/seed/business-extra.force.js          (dry run / preview)
 *       node src/seed/business-extra.force.js --apply    (write to DB)
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Page } from "../models/Page.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "business-extra.data.json"), "utf8"));
const APPLY = process.argv.includes("--apply");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB\n");

  const page = await Page.findOne({ slug: "business" });
  if (!page) {
    console.error("❌ 'business' page not found.");
    await mongoose.connection.close();
    process.exit(1);
  }

  const cur = page.sections ?? {};
  const set = {};
  const plan = [];

  // New whole sections — only seed if missing (never clobber real edits).
  for (const key of ["solutionsHeader", "valueProps", "whoItsFor", "howToGetStarted"]) {
    if (cur[key] && (typeof cur[key] !== "object" || Object.keys(cur[key]).length > 0)) {
      plan.push(`${key}: already present — skipped`);
    } else {
      set[`sections.${key}`] = DATA[key];
      plan.push(`${key}: SEED`);
    }
  }

  // CTA: add missing heading/accent/label/link without touching description/image.
  const cta = cur.cta ?? {};
  const ce = DATA.ctaExtra;
  if (!cta.heading) {
    // Use the clean "first part" default (NOT the old full cta.title), so the
    // accent word isn't duplicated once it renders as a separate gradient span.
    set["sections.cta.heading"] = ce.heading;
    plan.push(`cta.heading: SEED ("${set["sections.cta.heading"]}")`);
  } else plan.push("cta.heading: already present — skipped");
  if (!cta.headingAccent) {
    set["sections.cta.headingAccent"] = ce.headingAccent;
    plan.push("cta.headingAccent: SEED");
  } else plan.push("cta.headingAccent: already present — skipped");
  if (!cta.ctaLabel) {
    set["sections.cta.ctaLabel"] = ce.ctaLabel;
    plan.push("cta.ctaLabel: SEED");
  } else plan.push("cta.ctaLabel: already present — skipped");
  if (!cta.ctaLink) {
    set["sections.cta.ctaLink"] = ce.ctaLink;
    plan.push("cta.ctaLink: SEED");
  } else plan.push("cta.ctaLink: already present — skipped");

  console.log("=== PLAN ===");
  plan.forEach((p) => console.log("  " + p));

  if (Object.keys(set).length === 0) {
    console.log("\nNothing to seed — all sections already present.");
    await mongoose.connection.close();
    return;
  }

  if (!APPLY) {
    console.log("\nℹ️  DRY RUN. Re-run with --apply to write.");
    await mongoose.connection.close();
    return;
  }

  await Page.updateOne({ slug: "business" }, { $set: set });
  console.log("\n✅ APPLIED — new business sections seeded. Existing edits preserved.");
  await mongoose.connection.close();
  console.log("Database connection closed");
}

run().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
