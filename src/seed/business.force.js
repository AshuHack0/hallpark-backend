import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";

dotenv.config();

const DEFAULT_BUSINESS_SOLUTIONS = [
  {
    title: "Smart Public Parking",
    description: "Modernize public parking operations with mobile payments, virtual tickets, real-time availability tracking, and seamless digital parking experiences.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
    icon: "🅿️",
  },
  {
    title: "Private Parking Rental",
    description: "Enable property owners and businesses to monetize unused parking spaces through hourly, daily, monthly, or annual rentals.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
    icon: "🏠",
  },
  {
    title: "Residential Parking Management",
    description: "Simplify resident and visitor parking with secure access control, automated entry systems, guest management, and smart allocation tools.",
    image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
    icon: "🏢",
  },
  {
    title: "Commercial & Retail Parking",
    description: "Enhance customer convenience with frictionless parking experiences designed for malls, offices, retail destinations, and hospitality environments.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
    icon: "🛍️",
  },
  {
    title: "AI Access & Gate Control",
    description: "Automate entry and exit using smart gate systems, license plate recognition, and digital verification technologies.",
    image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
    icon: "🤖",
  },
  {
    title: "Fleet & Mobility Solutions",
    description: "Support businesses with fleet parking management, mobility integration, logistics coordination, and operational parking optimization.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    icon: "🚗",
  },
  {
    title: "Smart City Parking Integration",
    description: "Connect parking systems with city infrastructure for real-time traffic coordination, municipal dashboards, and urban mobility optimization.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
    icon: "🌆",
  },
  {
    title: "Mobile App Parking Ecosystem",
    description: "Provide users with booking, payments, navigation, and parking history in one seamless mobile platform.",
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
    icon: "📱",
  },
  {
    title: "Data & AI Analytics Dashboard",
    description: "Deliver actionable insights on occupancy trends, peak hours, revenue performance, and space utilization.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
    icon: "📊",
  },
  {
    title: "Cashless Payment Ecosystem",
    description: "Support multiple payment methods including cards, wallets, QR payments, and subscription billing models.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
    icon: "💳",
  },
  {
    title: "Security & Surveillance Integration",
    description: "Integrate CCTV, ANPR/LPR systems, and automated alerts to enhance safety and compliance.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
    icon: "🔒",
  },
  {
    title: "EV Charging Parking Integration",
    description: "Combine parking with electric vehicle charging stations for future-ready mobility infrastructure.",
    image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
    icon: "⚡",
  },
];

const DEFAULT_WHO_WE_WORK = [
  {
    title: "Property Developers",
    description: "Transform residential and commercial projects with intelligent parking infrastructure that increases property value, improves traffic flow, and delivers future-ready smart mobility experiences.",
    image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
    benefits: ["Increased Property Value", "Smart Infrastructure", "Future-Ready Design"],
  },
  {
    title: "Shopping Malls & Retail",
    description: "Create faster, smoother, and stress-free visitor experiences with automated parking, digital payments, real-time availability tracking, and seamless customer journeys.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
    benefits: ["Better Customer Experience", "Increased Foot Traffic", "Digital Payments"],
  },
  {
    title: "Residential Communities",
    description: "Deliver secure, organized, and hassle-free parking management for residents, visitors, and tenants with smart access control and automated entry systems.",
    image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
    benefits: ["Secure Access Control", "Visitor Management", "Resident Satisfaction"],
  },
  {
    title: "Hotels & Hospitality",
    description: "Enhance guest experiences with premium valet integration, frictionless parking access, digital visitor management, and luxury smart parking services.",
    image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
    benefits: ["Premium Guest Experience", "Valet Integration", "Digital Management"],
  },
  {
    title: "Government & Public",
    description: "Support smart city initiatives with scalable parking ecosystems, AI-powered mobility solutions, real-time analytics, and intelligent urban traffic management.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
    benefits: ["Smart City Solutions", "Traffic Management", "Real-Time Analytics"],
  },
  {
    title: "Service Providers",
    description: "Collaborate with HalaPark to integrate innovative parking technologies, EV charging systems, automation tools, and mobility solutions into a growing smart ecosystem.",
    image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
    benefits: ["Technology Integration", "Scalable Solutions", "Growing Ecosystem"],
  },
  {
    title: "Commercial Towers",
    description: "Simplify employee and visitor parking with automated access control, reserved parking management, and seamless daily parking experiences for modern workplaces.",
    image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
    benefits: ["Employee Satisfaction", "Automated Access", "Reserved Spaces"],
  },
  {
    title: "Airports & Hubs",
    description: "Reduce congestion and improve vehicle movement with intelligent parking systems designed for high-traffic environments and large-scale mobility operations.",
    image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
    benefits: ["Congestion Reduction", "High-Volume Handling", "Smooth Traffic"],
  },
  {
    title: "Universities",
    description: "Manage student, faculty, and visitor parking efficiently using smart permits, digital parking management, and real-time occupancy monitoring.",
    image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
    benefits: ["Smart Permits", "Digital Management", "Occupancy Tracking"],
  },
  {
    title: "Healthcare Facilities",
    description: "Provide stress-free parking experiences for patients, staff, and visitors with smart guidance systems, automated entry, and optimized traffic flow.",
    image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
    benefits: ["Patient Comfort", "Staff Efficiency", "Visitor Guidance"],
  },
  {
    title: "Event Venues",
    description: "Handle large parking demand during concerts, exhibitions, and events with intelligent crowd management, dynamic parking allocation, and faster vehicle access.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
    benefits: ["Crowd Management", "Dynamic Allocation", "Fast Access"],
  },
];

const DEFAULT_PARTNERS_SHOWCASE = {
  heading: "Helping you to correctly",
  headingGradient: "set-up, build,",
  subheading: "and protect your brand and business",
  description: "Unsure of the next steps toward your business expansion? Want to ensure your logistics are in order? With 20+ years of business experience & extensive legal training, we'll help you navigate your legal issue and provide the best solution for:",
  image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
  stats: [
    { value: "5th", label: "Field Expertise" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "120", label: "CP Clients Trusted" },
  ],
  ctaLabel: "Get Started",
  partners: {
    heading: "Trusted by Industry Leaders",
    subheading: "Work with some of the most recognized brands and organizations",
    row1: [
      { name: "Company A", industry: "Retail", initials: "CA", color: "#0088FF" },
      { name: "Company B", industry: "Tech", initials: "CB", color: "#1AB2FF" },
    ],
    row2: [
      { name: "Company C", industry: "Finance", initials: "CC", color: "#FF6B6B" },
      { name: "Company D", industry: "Hospitality", initials: "CD", color: "#FFB347" },
    ],
  },
  ctaSection: {
    title: "Ready to Partner with HalaPark?",
    description: "Join our growing network of trusted partners and transform your parking infrastructure today.",
    image: "/hf_20260327_064457_c75923ba-dc06-4c6e-9b63-fa181e94bcfa.png",
  },
};

const DEFAULT_ADVANTAGE = [
  {
    title: "Smart Mobility Ecosystem",
    description: "We connect drivers, property owners, operators, and service providers through one intelligent platform.",
  },
  {
    title: "Seamless Digital Experience",
    description: "From booking to payment and access control, every interaction is optimized for speed, simplicity, and convenience.",
  },
  {
    title: "Future-Ready Technology",
    description: "Built for modern cities, evolving mobility demands, and scalable smart infrastructure.",
  },
  {
    title: "Data-Driven Operations",
    description: "Make smarter business decisions using live operational insights, occupancy analytics, and performance reporting.",
  },
];

const DEFAULT_TRANSFORM_PARKING = {
  title: "Ready to Transform Your Parking Business?",
  description: "Partner with HalaPark and unlock the future of intelligent parking management, smart mobility, and connected urban infrastructure.",
  parkingPartnerTitle: "Become a Parking Partner",
  parkingPartnerSubtitle: "Turn your parking assets into profitable smart mobility solutions.",
  parkingPartnerDescription: "HalaPark enables landlords, parking operators, residential buildings, commercial properties, and public entities to digitize and monetize their parking infrastructure through advanced automation and intelligent management tools. Existing parking platforms increasingly focus on ticketless entry, occupancy optimization, AI-powered access control, and cloud-based management systems to improve efficiency and user convenience.",
  parkingPartnerPerks: ["Smart parking management dashboard", "Digital payment integration", "Parking categorization & organization", "Real-time occupancy monitoring", "Traffic & congestion management", "Advanced reporting & analytics", "Secure automated access systems", "Mobile & cloud-based management", "Revenue optimization tools", "Flexible subscription & booking models"],
  servicePartnerTitle: "Become a Service Partner",
  servicePartnerSubtitle: "Join the future of smart mobility and parking innovation.",
  servicePartnerDescription1: "HalaPark collaborates with service providers, technology suppliers, hardware manufacturers, and mobility partners to deliver integrated parking experiences across the UAE and beyond.",
  servicePartnerDescription2: "Whether you specialize in automation, EV charging, security systems, maintenance services, mobility solutions, or smart city technologies, we create opportunities for strategic growth and long-term collaboration.",
  servicePartnerPerks: ["Smart parking hardware", "AI & automation systems", "EV charging infrastructure", "Security & surveillance solutions", "Facility management services", "Mobility & logistics solutions", "Software integrations", "IoT & smart city technologies"],
};

async function seedBusiness() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get current business page
    const page = await Page.findOne({ slug: "business" });
    if (!page) {
      console.log("Business page not found. Creating it...");
      await Page.create({
        slug: "business",
        name: "Business",
        path: "/business",
        sections: {
          solutions: DEFAULT_BUSINESS_SOLUTIONS,
          whoWeWork: DEFAULT_WHO_WE_WORK,
          transformParking: DEFAULT_TRANSFORM_PARKING,
        },
        published: true,
      });
      console.log("✅ Business page created with all sections");
    } else {
      // Update all sections while preserving other sections
      await Page.updateOne(
        { slug: "business" },
        {
          $set: {
            "sections.solutions": DEFAULT_BUSINESS_SOLUTIONS,
            "sections.whoWeWork": DEFAULT_WHO_WE_WORK,
            "sections.advantage": DEFAULT_ADVANTAGE,
            "sections.partnersShowcase": DEFAULT_PARTNERS_SHOWCASE,
            "sections.transformParking": DEFAULT_TRANSFORM_PARKING,
          }
        }
      );
      console.log("✅ Business page updated with all sections");
    }

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedBusiness();
