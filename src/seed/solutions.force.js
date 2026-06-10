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
    cards: [
      { title: "Smart Parking Management", description: "Centralized platform for monitoring occupancy, controlling parking operations, and managing multiple facilities in real time.", image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png" },
      { title: "Automated Access Control", description: "ANPR and smart barrier systems enabling seamless and secure vehicle access.", image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png" },
      { title: "Parking Guidance System", description: "Real-time wayfinding and space guidance to reduce congestion and improve traffic flow inside facilities.", image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png" },
      { title: "Mobile & Digital Experience", description: "Mobile reservations, digital payments, subscriptions, and contactless parking interactions.", image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png" },
      { title: "Digital Valet Operations", description: "Structured valet workflows with digital ticketing, vehicle tracking, and retrieval management.", image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png" },
      { title: "EV Charging Integration", description: "Integrated EV charging infrastructure with smart billing and charging management.", image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png" },
      { title: "AI & Parking Analytics", description: "Advanced occupancy analytics, traffic insights, predictive trends, and reporting dashboards.", image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png" },
    ],
  },
  integration: {
    heading: "Solution Integration",
    headingGradient: "Integration",
    subtitle: "End-to-End Integrated Parking Solution",
    cards: [
      { title: "All-in-One Barrier Integration", description: "All-in-one compact system with barriers, AI cameras, and lighting for efficient parking.", points: ["Smart barrier control", "AI camera integration", "Automated lighting"], image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png", gradient: "from-[#0078E0]/85 via-[#0088FF]/60 to-[#0088FF]/20" },
      { title: "ANPR & AI Camera Integration", description: "ANPR and AI cameras enable secure, real-time parking detection.", points: ["License plate recognition", "Real-time detection", "Secure access control"], image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png", gradient: "from-[#0050B3]/85 via-[#0066CC]/60 to-[#0088FF]/20" },
      { title: "Guidance Display Integration", description: "Smart displays show real-time parking info for better user experience.", points: ["Live space availability", "Wayfinding signage", "Zone-level guidance"], image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png", gradient: "from-[#004F9A]/85 via-[#0070D0]/60 to-[#1AB2FF]/20" },
      { title: "Software & Kiosk Integration", description: "Unified system with apps, operations, and kiosks for quick payments and access.", points: ["Mobile app & web portal", "Self-service kiosks", "Integrated payments"], image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png", gradient: "from-[#005FA3]/85 via-[#0078C8]/60 to-[#1AB2FF]/20" },
      { title: "Sensor-Based Parking Management", description: "IoT sensors enable real-time parking tracking and space management.", points: ["Bay-level occupancy", "Instant alerts", "Predictive analytics"], image: "/hf_20260327_071129_800d49da-6fb8-4b7e-a1ba-b32db4c31565.png", gradient: "from-[#003F7F]/85 via-[#005BB8]/60 to-[#0088FF]/20" },
      { title: "End-to-End System Integration", description: "Integrated platform for scalable, automated parking operations.", points: ["IoT sensor management", "Guidance display system", "Full stack automation"], image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png", gradient: "from-[#003F7F]/85 via-[#0060B8]/60 to-[#0088FF]/20" },
    ],
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
