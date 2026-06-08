import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";

dotenv.config();

async function checkServices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const page = await Page.findOne({ slug: "services" }).lean();

    if (!page) {
      console.log("❌ Services page not found in database");
      process.exit(1);
    }

    console.log("\n📄 Services Page found:");
    console.log(`   Name: ${page.name}`);
    console.log(`   Path: ${page.path}`);
    console.log(`   Published: ${page.published}`);
    console.log(`   Sections: ${Object.keys(page.sections || {}).join(", ")}`);

    if (page.sections) {
      console.log("\n🎯 Hero Section:");
      console.log(JSON.stringify(page.sections.hero, null, 2));

      console.log("\n🛠️ Services:");
      if (Array.isArray(page.sections.services) && page.sections.services.length > 0) {
        console.log(`   Found ${page.sections.services.length} services:`);
        page.sections.services.forEach((service, i) => {
          console.log(`   ${i + 1}. ${service.name || "Unnamed"} (${service.slug})`);
        });
      } else {
        console.log("   ❌ No services seeded yet (empty array)");
      }
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

checkServices();
