import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";

dotenv.config();

const DEFAULT_SOLUTIONS_PAGE = {
  hero: {
    title: "Intelligent Parking Infrastructure",
    subtitle: "HalaPark delivers an AI-powered smart parking solution for large-scale residential, commercial, and mixed-use developments across the UAE.",
    ctaLabel: "Get In Touch",
    videoUrl: "/Halapark Hero Page-Ai.mp4",
  },
  challenges: {
    heading: "Parking Challenges",
    headingGradient: "Challenges",
    subtitle: "Solving Parking Inefficiencies Through Smart Mobility",
    description: "Traditional parking systems are manual, fragmented, and lack real-time visibility, causing congestion, operational inefficiencies, and poor user experience. HalaPark transforms parking into a connected ecosystem powered by automation, AI, and real-time control.",
    items: [
      "Limited real-time parking visibility",
      "Manual vehicle entry and exit processes",
      "Inefficient space utilization",
      "Friction at access and payment points",
    ],
    ctaLabel: "View App Features",
  },
  solutions: {
    heading: "Our Solutions",
    headingGradient: "Solutions",
    subtitle: "Intelligent parking systems built for efficiency, control, and scale",
  },
  integration: {
    heading: "Solution Integration",
    headingGradient: "Integration",
    subtitle: "End-to-End Integrated Parking Solution",
  },
  trust: {
    heading: "Built for Smart Cities",
    headingGradient: "Smart Cities",
    subtitle: "HalaPark extends beyond parking into urban mobility infrastructure, supporting large-scale smart city development and city-wide optimization.",
  },
  features: {
    heading: "Built for High-Demand Environments",
    headingGradient: "Environments",
    subtitle: "From airports to smart cities, HalaPark scales across every high-traffic environment.",
  },
  why: {
    heading: "Why Leading Developments Choose Halapark?",
    headingGradient: "Choose Halapark?",
  },
  cta: {
    heading: "Transform Parking Into a Fully Connected Mobility Infrastructure",
    headingGradient: "Mobility Infrastructure",
    subtitle: "Halapark replaces fragmented parking systems with one intelligent platform that connects access control, real-time operations, and data-driven intelligence. Built for scale, designed for modern developments, and engineered to upgrade existing infrastructure without disruption.",
    ctaLabel: "Request Demo",
    ctaSecondaryLabel: "Talk to Our Team",
  },
};

async function seedSolutions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const result = await Page.updateOne(
      { slug: "solutions" },
      { $set: { sections: DEFAULT_SOLUTIONS_PAGE } }
    );

    if (result.matchedCount === 0) {
      console.log("Solutions page not found. Creating it...");
      await Page.create({
        slug: "solutions",
        name: "Solutions",
        path: "/solutions",
        sections: DEFAULT_SOLUTIONS_PAGE,
        published: true,
      });
      console.log("✅ Solutions page created with all 8 sections");
    } else {
      console.log("✅ Solutions page updated with all 8 sections");
    }

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedSolutions();
