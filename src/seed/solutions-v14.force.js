/**
 * Non-destructive seed for the Solutions page — content from
 * "HALAPARK SOLUTIONS PAGE v14.pdf" (22 solutions across 7 groups).
 *
 * Safe by design:
 *   • Reads the existing "solutions" page first.
 *   • Rebuilds sections.solutions.cards = the 22 solutions, but PRESERVES the
 *     existing Cloudinary/uploaded image for any card whose slug already exists.
 *   • Rebuilds sections.details = the 22 detail pages, PRESERVING existing images
 *     by slug. Adds new fields (howItOperates, systemComponents, group).
 *   • Adds sections.solutions.advantages (shared block) + sections.solutions.groups.
 *   • $sets ONLY those keys — hero / challenges / integration / trust / features /
 *     why / cta are left untouched.
 *
 * Run:  node src/seed/solutions-v14.force.js          (dry run — prints plan)
 *       node src/seed/solutions-v14.force.js --apply   (writes to DB)
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";
import {
  SOLUTIONS_V14,
  SOLUTION_ADVANTAGES,
  SOLUTION_GROUPS,
  CARD_DESCRIPTIONS,
  DEFAULT_DETAIL_IMAGE,
} from "./solutions-v14.data.js";

dotenv.config();

const APPLY = process.argv.includes("--apply");

const isUploaded = (img) =>
  typeof img === "string" && img && img !== "/image.png" && img.trim() !== "";

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB\n");

  const page = await Page.findOne({ slug: "solutions" });
  if (!page) {
    console.error("❌ 'solutions' page not found. Run `npm run seed:solutions` first.");
    await mongoose.connection.close();
    process.exit(1);
  }

  const sections = page.sections || {};
  const oldCards = Array.isArray(sections.solutions?.cards) ? sections.solutions.cards : [];
  const oldDetails = Array.isArray(sections.details) ? sections.details : [];

  // Index existing images by slug (and by slugified title as a fallback).
  const slugifyTitle = (t = "") =>
    t.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const cardImgBySlug = {};
  for (const c of oldCards) {
    const s = c.slug || slugifyTitle(c.title);
    if (s && isUploaded(c.image)) cardImgBySlug[s] = c.image;
  }
  const detailImgBySlug = {};
  for (const d of oldDetails) {
    if (d.slug && isUploaded(d.image)) detailImgBySlug[d.slug] = d.image;
  }

  // Build new cards + details.
  const newCards = [];
  const newDetails = [];
  let imgPreserved = 0;

  for (const sol of SOLUTIONS_V14) {
    const image = cardImgBySlug[sol.slug] || detailImgBySlug[sol.slug] || DEFAULT_DETAIL_IMAGE;
    if (cardImgBySlug[sol.slug] || detailImgBySlug[sol.slug]) imgPreserved += 1;

    newCards.push({
      slug: sol.slug,
      group: sol.group,
      title: sol.eyebrow, // card shows the short solution name
      description: CARD_DESCRIPTIONS[sol.slug] || sol.eyebrow,
      image,
    });

    newDetails.push({
      slug: sol.slug,
      group: sol.group,
      eyebrow: sol.eyebrow,
      title: sol.title,
      intro: sol.intro || "",
      image,
      ...(sol.howItOperates ? { howItOperates: sol.howItOperates } : {}),
      ...(sol.systemComponents
        ? {
            systemComponentsHeading: sol.systemComponentsHeading || "System Components",
            systemComponents: sol.systemComponents,
          }
        : {}),
      benefitsHeading: sol.benefitsHeading || "Key Benefit",
      benefits: sol.benefits || [],
      problemHeading: sol.problemHeading || "Problem We Solve",
      problemBody: sol.problemBody || "",
      ctaLabel: sol.ctaLabel || "Talk to Our Team",
      ctaLink: sol.ctaLink || "/contact",
    });
  }

  // ── Plan output ────────────────────────────────────────────────────────────
  console.log("=== PLAN ===");
  console.log(`Cards:   ${oldCards.length} → ${newCards.length}`);
  console.log(`Details: ${oldDetails.length} → ${newDetails.length}`);
  console.log(`Images preserved from existing data: ${imgPreserved}`);
  console.log(`Groups: ${SOLUTION_GROUPS.length} | Advantages: ${SOLUTION_ADVANTAGES.items.length}`);
  console.log("\nFinal solutions (group · slug · image source):");
  newCards.forEach((c, i) => {
    const src = isUploaded(cardImgBySlug[c.slug] || detailImgBySlug[c.slug]) ? "kept" : "placeholder";
    console.log(`  ${String(i + 1).padStart(2)}. [${c.group}] ${c.slug}  (${src})`);
  });

  if (!APPLY) {
    console.log("\nℹ️  DRY RUN. Re-run with `--apply` to write these changes.");
    await mongoose.connection.close();
    return;
  }

  await Page.updateOne(
    { slug: "solutions" },
    {
      $set: {
        "sections.solutions.cards": newCards,
        "sections.solutions.groups": SOLUTION_GROUPS,
        "sections.solutions.advantages": SOLUTION_ADVANTAGES,
        "sections.details": newDetails,
      },
    },
  );

  console.log("\n✅ APPLIED — solutions cards, groups, advantages, and details updated.");
  console.log("   (hero / challenges / integration / trust / features / why / cta untouched)");

  await mongoose.connection.close();
  console.log("Database connection closed");
}

run().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
