import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";

dotenv.config();

const DEFAULT_WHY_HALAPARK = {
  heading: "Why HalaPark",
  subtitle: "What Makes Us Different",
  items: [
    {
      title: "AI-Powered Intelligence",
      subtitle: "Smart automation that learns and adapts to deliver the best parking experience.",
      icon: "Zap",
      image: "/AI-Driven Parking Intelligence.jpeg",
    },
    {
      title: "End-to-End Solutions",
      subtitle: "From mobile apps to backend operations, we handle every aspect of modern parking.",
      icon: "Package",
      image: "/Booking.png",
    },
    {
      title: "Real-Time Operations",
      subtitle: "Live tracking, instant updates, and immediate insights to optimize your parking ecosystem.",
      icon: "Activity",
      image: "/Barrier-Free Parking.jpeg",
    },
    {
      title: "Scalable Infrastructure",
      subtitle: "Built to grow with your business, from single properties to enterprise networks.",
      icon: "TrendingUp",
      image: "/Business2.png",
    },
    {
      title: "User-Centric Design",
      subtitle: "Intuitive interfaces and seamless experiences that customers love.",
      icon: "Users",
      image: "/Cashless s Secure Payments.jpeg",
    },
    {
      title: "Security & Compliance",
      subtitle: "Enterprise-grade security with full compliance for financial and operational data.",
      icon: "Lock",
      image: "/37ea36b9e2f10ae7848280afbc3236af.jpg.jpeg",
    },
  ],
};

const DEFAULT_SERVICES_PAGE = {
  hero: {
    title: "Smart Parking. Vehicle Care Partner.",
    subtitle: "Smart parking and vehicle care built for convenience, safety, and innovation.",
    ctaLabel: "Get a Quote",
  },
  services: [],
};

async function seedPages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Seed Why HalaPark section in home page
    const homeResult = await Page.updateOne(
      { slug: "home" },
      { $set: { "sections.whyHalapark": DEFAULT_WHY_HALAPARK } }
    );

    if (homeResult.matchedCount === 0) {
      console.log("Home page not found. Creating it...");
      await Page.create({
        slug: "home",
        name: "Home",
        path: "/",
        sections: {
          whyHalapark: DEFAULT_WHY_HALAPARK,
        },
        published: true,
      });
      console.log("✅ Home page created with default Why HalaPark section");
    } else {
      console.log("✅ Why HalaPark section seeded successfully");
    }

    // Seed Services page
    const servicesExists = await Page.findOne({ slug: "services" }).lean();
    if (!servicesExists) {
      console.log("Services page not found. Creating it...");
      await Page.create({
        slug: "services",
        name: "Services",
        path: "/services",
        sections: DEFAULT_SERVICES_PAGE,
        published: true,
      });
      console.log("✅ Services page created with default sections");
    } else {
      console.log("✅ Services page already exists");
    }

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedPages();
