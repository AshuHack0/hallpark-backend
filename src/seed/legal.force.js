import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";

dotenv.config();

// Legal / long-text pages (Terms, Privacy, Refund). Each is a generic Page with
// a single `legal` section holding a plain-text body (+ Arabic sibling). Content
// starts EMPTY — the admin fills it from the dashboard. This script is
// idempotent: it CREATES any missing page and never overwrites existing content.
const LEGAL_PAGES = [
  { slug: "terms-conditions", name: "Terms & Conditions", path: "/terms-conditions" },
  { slug: "privacy-policy", name: "Privacy Policy", path: "/privacy-policy" },
  { slug: "refund-policy", name: "Refund Policy", path: "/refund-policy" },
];

function emptyLegalSections(name) {
  return {
    legal: {
      title: name,
      body: "",
      ar: { title: "", body: "" },
    },
  };
}

async function seedLegalPages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const page of LEGAL_PAGES) {
      const existing = await Page.findOne({ slug: page.slug }).lean();
      if (existing) {
        console.log(`✅ ${page.slug} already exists — left untouched`);
        continue;
      }
      await Page.create({
        slug: page.slug,
        name: page.name,
        path: page.path,
        sections: emptyLegalSections(page.name),
        published: true,
      });
      console.log(`✅ Created ${page.slug}`);
    }

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Legal seeding failed:", error);
    process.exit(1);
  }
}

seedLegalPages();
