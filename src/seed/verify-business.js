import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";

dotenv.config();

async function verify() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({ slug: "business" }).lean();

    console.log("\n📊 Business Solutions Count:", page.sections.solutions.length);
    console.log("\n📝 All Solutions:");
    page.sections.solutions.forEach((s, i) => {
      console.log(`${i + 1}. ${s.icon} ${s.title}`);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

verify();
