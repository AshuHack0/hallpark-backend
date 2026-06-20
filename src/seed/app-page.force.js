/**
 * Non-destructive seed for the "app" page — fills in the REAL page content
 * (which currently sits hardcoded on the frontend) so the CMS reflects the
 * actual App page instead of placeholder/test values ("App", "Edit this page…").
 *
 * Image-safe: any image already uploaded via the CMS is PRESERVED. An image is
 * treated as "uploaded" if it's a Cloudinary URL or an admin upload path
 * (contains "cloudinary", starts with "http", or starts with "/hf_"). The seed's
 * own default image paths only fill in slots that are empty or still on a bundled
 * default asset.
 *
 * Run:  node src/seed/app-page.force.js           (dry run / preview)
 *       node src/seed/app-page.force.js --apply    (write to DB)
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Page } from "../models/Page.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "app-page.data.json"), "utf8"));
const APPLY = process.argv.includes("--apply");

// Does this image look like a real CMS upload we must keep?
const isUploaded = (img) =>
  typeof img === "string" &&
  img.length > 0 &&
  (img.startsWith("http") || img.includes("cloudinary") || img.startsWith("/hf_") || img.startsWith("/uploads"));

// Keep an existing uploaded image; otherwise take the seed default.
const keepImage = (existing, seeded) => (isUploaded(existing) ? existing : seeded);

function mergeImagesArray(seedArr, existingArr) {
  if (!Array.isArray(existingArr)) return seedArr;
  return seedArr.map((item, i) => {
    const ex = existingArr[i];
    if (item.image !== undefined) return { ...item, image: keepImage(ex?.image, item.image) };
    return item;
  });
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB\n");

  const page = await Page.findOne({ slug: "app" });
  if (!page) {
    console.error("❌ 'app' page not found.");
    await mongoose.connection.close();
    process.exit(1);
  }

  const cur = page.sections ?? {};

  // Build the next sections, preserving uploaded images.
  const next = {
    hero: { ...DATA.hero, image: keepImage(cur.hero?.image, DATA.hero.image) },
    platform: DATA.platform,
    serviceTabs: DATA.serviceTabs,
    screenshots: mergeImagesArray(DATA.screenshots, cur.screenshots),
    currency: DATA.currency,
    featureCards: mergeImagesArray(DATA.featureCards, cur.featureCards),
    halapark: {
      ...DATA.halapark,
      // keep any uploaded store icons by index
      storeLinks: DATA.halapark.storeLinks.map((s, i) => ({
        ...s,
        icon: keepImage(cur.halapark?.storeLinks?.[i]?.icon, s.icon),
      })),
    },
  };

  console.log("=== PLAN (app sections to seed) ===");
  console.log(`hero:         title "${next.hero.title}"  | image ${next.hero.image}${isUploaded(cur.hero?.image) ? "  (kept upload)" : ""}`);
  console.log(`platform:     ${next.platform.appFeatures.length} app + ${next.platform.websiteFeatures.length} website features`);
  console.log(`serviceTabs:  ${next.serviceTabs.tabs.length} tabs (${cur.serviceTabs?.tabs?.length ?? 0} → ${next.serviceTabs.tabs.length})`);
  console.log(`screenshots:  ${next.screenshots.length} (${cur.screenshots?.length ?? 0} → ${next.screenshots.length})`);
  console.log(`currency:     ${next.currency.cardFeatures.length} card features`);
  console.log(`featureCards: ${next.featureCards.length} (${cur.featureCards?.length ?? 0} → ${next.featureCards.length})`);
  console.log(`halapark:     ${next.halapark.storeLinks.length} store links`);

  if (!APPLY) {
    console.log("\nℹ️  DRY RUN. Re-run with --apply to write.");
    await mongoose.connection.close();
    return;
  }

  await Page.updateOne(
    { slug: "app" },
    {
      $set: {
        "sections.hero": next.hero,
        "sections.platform": next.platform,
        "sections.serviceTabs": next.serviceTabs,
        "sections.screenshots": next.screenshots,
        "sections.currency": next.currency,
        "sections.featureCards": next.featureCards,
        "sections.halapark": next.halapark,
      },
    },
  );

  console.log("\n✅ APPLIED — app page content seeded. Uploaded images preserved.");
  await mongoose.connection.close();
  console.log("Database connection closed");
}

run().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
