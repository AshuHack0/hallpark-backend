import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Points the "find parking" buttons at the new Parking Locations page.
//
//   node src/seed/parking-locations-links.force.js          → show what would change
//   node src/seed/parking-locations-links.force.js --apply  → write the links
//
// RUN THIS ONLY AFTER THE FRONTEND IS DEPLOYED — until /parking-locations is
// live, these buttons would lead to a 404 on the public site.

const TARGET = "/parking-locations";

// [page slug, link field under `sections`, label field (sanity check), where it is]
const BUTTONS = [
  ["home", "hero.slides.0.ctaLink", "hero.slides.0.ctaLabel", "Home · hero slide 1 button"],
  ["home", "howItWorks.ctaHref", "howItWorks.ctaLabel", "Home · How It Works button"],
  ["app", "hero.ctaHref", "hero.ctaLabel", "App · hero button"],
];

const apply = process.argv.includes("--apply");

function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc === undefined || acc === null ? acc : acc[key]), obj);
}

function setPath(obj, path, value) {
  const keys = path.split(".");
  let node = obj;
  for (let i = 0; i < keys.length - 1; i += 1) {
    if (node[keys[i]] === undefined || node[keys[i]] === null) return false;
    node = node[keys[i]];
  }
  node[keys[keys.length - 1]] = value;
  return true;
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("pages");

  const locationsPage = await col.findOne({ slug: "parking-locations" });
  if (!locationsPage) {
    console.error("❌ The parking-locations page does not exist yet. Run: npm run seed:parking-locations");
    await mongoose.disconnect();
    process.exit(1);
  }

  for (const [slug, linkPath, labelPath, where] of BUTTONS) {
    const page = await col.findOne({ slug });
    if (!page) {
      console.log(`⚠️  ${where}: page "${slug}" not found — skipped`);
      continue;
    }
    const sections = page.sections ?? {};
    const label = getPath(sections, labelPath);
    const current = getPath(sections, linkPath);

    if (label === undefined) {
      console.log(`⚠️  ${where}: "${labelPath}" not found — skipped (the section may have been renamed)`);
      continue;
    }
    if (current === TARGET) {
      console.log(`✓  ${where} ("${label}") already points at ${TARGET}`);
      continue;
    }

    console.log(`→  ${where} ("${label}"): ${JSON.stringify(current ?? "")} → ${TARGET}`);
    if (!apply) continue;

    if (!setPath(sections, linkPath, TARGET)) {
      console.log(`⚠️  ${where}: could not write "${linkPath}" — skipped`);
      continue;
    }
    await col.updateOne({ slug }, { $set: { sections, updatedAt: new Date() } });
  }

  console.log(apply ? "\n✅ Links updated." : "\nDry run — re-run with --apply to write these links.");
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error("❌ Failed:", err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
