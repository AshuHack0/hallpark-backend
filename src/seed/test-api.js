import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";

dotenv.config();

async function testAPI() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const page = await Page.findOne({ slug: "services" }).lean();

    if (!page) {
      console.log("❌ Services page not found");
      process.exit(1);
    }

    // Simulate what the API returns
    const apiResponse = {
      page: page
    };

    console.log("\n📤 API Response (what admin will receive):");
    console.log(JSON.stringify(apiResponse, null, 2).substring(0, 2000));
    console.log("...\n");

    if (apiResponse.page?.sections?.services) {
      console.log(`✅ Services array exists with ${apiResponse.page.sections.services.length} items`);
    } else {
      console.log("❌ Services array is missing or empty");
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

testAPI();
