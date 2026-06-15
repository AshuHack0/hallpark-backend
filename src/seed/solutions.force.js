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
      { slug: "smart-parking-management", title: "Smart Parking Management", description: "Centralized platform for monitoring occupancy, controlling parking operations, and managing multiple facilities in real time.", image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png" },
      { slug: "automated-access-control", title: "Automated Access Control", description: "ANPR and smart barrier systems enabling seamless and secure vehicle access.", image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png" },
      { slug: "parking-guidance-system", title: "Parking Guidance System", description: "Real-time wayfinding and space guidance to reduce congestion and improve traffic flow inside facilities.", image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png" },
      { slug: "mobile-digital-experience", title: "Mobile & Digital Experience", description: "Mobile reservations, digital payments, subscriptions, and contactless parking interactions.", image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png" },
      { slug: "digital-valet-operations", title: "Digital Valet Operations", description: "Structured valet workflows with digital ticketing, vehicle tracking, and retrieval management.", image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png" },
      { slug: "ev-charging-integration", title: "EV Charging Integration", description: "Integrated EV charging infrastructure with smart billing and charging management.", image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png" },
      { slug: "ai-parking-analytics", title: "AI & Parking Analytics", description: "Advanced occupancy analytics, traffic insights, predictive trends, and reporting dashboards.", image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png" },
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
  // Per-solution detail (blog-style) pages, keyed by `slug` and rendered at
  // /solutions/[slug]. Each maps to a card in `solutions.cards` above.
  details: [
    {
      slug: "smart-parking-management",
      eyebrow: "Smart Parking Management",
      title: "Centralized Control for Every Parking Facility",
      intro: "HalaPark gives operators a single, real-time view of occupancy, access, and revenue across every facility — replacing manual processes with intelligent automation and centralized control.",
      image: "/hf_20260327_064316_9c7b1a28-dbfa-456e-b88a-0087cb567a61.png",
      systemsHeading: "What's Included",
      systems: [
        "Real-time occupancy monitoring",
        "Multi-facility management dashboard",
        "Automated entry & exit control",
        "Live operational reporting",
        "Role-based staff access",
        "Centralized configuration & rules",
      ],
      benefitsHeading: "Key Benefit",
      benefits: [
        "Full visibility across all sites in one place",
        "Faster, automated day-to-day operations",
        "Lower operational cost and manual effort",
        "Data-driven decisions from live insights",
        "Scales seamlessly as facilities grow",
      ],
      problemHeading: "Problem We Solve",
      problemBody: "Most parking facilities run on disconnected, manual systems with little real-time visibility. This leads to congestion, underused space, revenue leakage, and high operational overhead. HalaPark centralizes everything into one intelligent platform.",
      ctaLabel: "Talk to Our Team",
      ctaLink: "/contact",
    },
    {
      slug: "automated-access-control",
      eyebrow: "Automated Access Control",
      title: "Seamless, Secure Vehicle Access",
      intro: "ANPR cameras and smart barrier systems let vehicles enter and exit without tickets or staff intervention — secure, fast, and fully automated.",
      image: "/hf_20260327_061010_f3bc038b-576f-4903-8896-5d998cc78527.png",
      systemsHeading: "What's Included",
      systems: [
        "ANPR license plate recognition",
        "Smart barrier & gate control",
        "QR / RFID / mobile access",
        "Whitelist & blacklist management",
        "Visitor & resident access rules",
        "Real-time access logs",
      ],
      benefitsHeading: "Key Benefit",
      benefits: [
        "Ticketless, contactless entry and exit",
        "Reduced congestion at access points",
        "Stronger security and audit trail",
        "Lower staffing requirements",
        "Seamless experience for users",
      ],
      problemHeading: "Problem We Solve",
      problemBody: "Manual ticketing and barrier control create bottlenecks, security gaps, and a poor user experience. HalaPark automates the full access journey with AI cameras and smart barriers integrated into one platform.",
      ctaLabel: "Talk to Our Team",
      ctaLink: "/contact",
    },
    {
      slug: "parking-guidance-system",
      eyebrow: "Parking Guidance System",
      title: "Real-Time Wayfinding That Reduces Congestion",
      intro: "Smart displays and sensors guide drivers straight to available spaces — cutting search time, easing congestion, and improving the in-facility experience.",
      image: "/hf_20260327_060926_cbb82448-441c-42ee-9589-785e7acd7565.png",
      systemsHeading: "What's Included",
      systems: [
        "Live space availability displays",
        "Zone-level guidance signage",
        "Bay-level occupancy sensors",
        "Dynamic directional routing",
        "Digital wayfinding integration",
        "Real-time data feed to the app",
      ],
      benefitsHeading: "Key Benefit",
      benefits: [
        "Drivers find spaces faster",
        "Reduced in-facility congestion",
        "Better traffic flow and safety",
        "Higher effective space utilization",
        "Improved customer satisfaction",
      ],
      problemHeading: "Problem We Solve",
      problemBody: "Drivers circling for spaces cause congestion, frustration, and wasted capacity. HalaPark's guidance system uses live data and smart signage to route drivers directly to open bays.",
      ctaLabel: "Talk to Our Team",
      ctaLink: "/contact",
    },
    {
      slug: "mobile-digital-experience",
      eyebrow: "Mobile & Digital Experience",
      title: "Parking in the Palm of Your Hand",
      intro: "A unified mobile and digital experience for reservations, cashless payments, subscriptions, and contactless parking — all from one app.",
      image: "/hf_20260327_065515_cd3808b8-d99d-4faa-817d-e3f772726da6.png",
      systemsHeading: "What's Included",
      systems: [
        "Mobile app (iOS / Android)",
        "Online reservations & pre-booking",
        "Cashless & contactless payments",
        "Subscriptions & season passes",
        "Digital receipts & history",
        "In-app support & notifications",
      ],
      benefitsHeading: "Key Benefit",
      benefits: [
        "Frictionless booking and payment",
        "Higher customer loyalty and retention",
        "New recurring revenue streams",
        "Reduced cash handling",
        "Always-on self-service",
      ],
      problemHeading: "Problem We Solve",
      problemBody: "Cash-based, on-site-only parking is slow and inconvenient. HalaPark digitizes the full journey — discovery, booking, payment, and support — into one seamless app experience.",
      ctaLabel: "Talk to Our Team",
      ctaLink: "/contact",
    },
    {
      slug: "digital-valet-operations",
      eyebrow: "Digital Valet Operations",
      title: "Structured, Trackable Valet Workflows",
      intro: "Digital ticketing, vehicle tracking, and retrieval management bring structure and accountability to valet operations.",
      image: "/hf_20260327_061900_db12a62e-2867-44b6-83f0-ea7f1a5442ef.png",
      systemsHeading: "What's Included",
      systems: [
        "Digital valet ticketing",
        "Vehicle location tracking",
        "Request & retrieval management",
        "SMS / app vehicle requests",
        "Staff task assignment",
        "Valet performance reporting",
      ],
      benefitsHeading: "Key Benefit",
      benefits: [
        "Faster, more reliable retrieval",
        "Full accountability and audit trail",
        "Fewer lost tickets and disputes",
        "Better staff coordination",
        "Premium guest experience",
      ],
      problemHeading: "Problem We Solve",
      problemBody: "Paper-based valet is error-prone, slow, and hard to audit. HalaPark digitizes valet end-to-end with tickets, tracking, and retrieval workflows in one system.",
      ctaLabel: "Talk to Our Team",
      ctaLink: "/contact",
    },
    {
      slug: "ev-charging-integration",
      eyebrow: "EV Charging Integration",
      title: "Integrated EV Charging & Smart Billing",
      intro: "Bring EV charging into your parking ecosystem with integrated charging management, smart billing, and real-time monitoring.",
      image: "/hf_20260327_070648_996630bc-828e-4cd7-8cb1-f42c30332d86.png",
      systemsHeading: "What's Included",
      systems: [
        "EV charger management",
        "Smart usage-based billing",
        "Real-time charging status",
        "Reservation of charging bays",
        "Energy & utilization reporting",
        "App-based charging control",
      ],
      benefitsHeading: "Key Benefit",
      benefits: [
        "New revenue from EV charging",
        "Future-ready infrastructure",
        "Unified parking + charging billing",
        "Optimized charger utilization",
        "Attracts EV-driving customers",
      ],
      problemHeading: "Problem We Solve",
      problemBody: "EV charging is often a siloed, manually billed add-on. HalaPark integrates charging into the same platform as parking — with smart billing, monitoring, and reservations.",
      ctaLabel: "Talk to Our Team",
      ctaLink: "/contact",
    },
    {
      slug: "ai-parking-analytics",
      eyebrow: "AI & Parking Analytics",
      title: "Turn Parking Data Into Decisions",
      intro: "Advanced occupancy analytics, traffic insights, predictive trends, and reporting dashboards help you optimize operations and revenue.",
      image: "/hf_20260327_062407_6dca49c0-90dd-468a-96f9-b36bba13ea8b.png",
      systemsHeading: "What's Included",
      systems: [
        "Occupancy & utilization analytics",
        "Traffic flow insights",
        "Predictive demand trends",
        "Revenue & performance dashboards",
        "Custom reports & exports",
        "Real-time alerts",
      ],
      benefitsHeading: "Key Benefit",
      benefits: [
        "Data-driven operational decisions",
        "Optimized pricing and capacity",
        "Early detection of issues",
        "Clear performance visibility",
        "Continuous improvement over time",
      ],
      problemHeading: "Problem We Solve",
      problemBody: "Without analytics, operators run blind — guessing at demand, pricing, and capacity. HalaPark surfaces real-time and predictive insights so every decision is backed by data.",
      ctaLabel: "Talk to Our Team",
      ctaLink: "/contact",
    },
    {
      slug: "seamless-integrations",
      eyebrow: "Seamless Integrations",
      title: "End-to-End Connected Infrastructure for Smart Parking",
      intro: "HalaPark connects with existing infrastructure to create a unified operational ecosystem without disrupting current systems. It integrates multiple technologies into one intelligent platform for centralized control and real-time operations.",
      image: "/collageallsolutionsection .jpeg",
      systemsHeading: "Integrated Systems",
      systems: [
        "Mobile App (iOS / Android)",
        "Web Portal / Dashboard",
        "ANPR / Area Scanning Cameras",
        "eCam Security / Monitoring System",
        "View 360 System & Processing Unit",
        "QR / RFID / Mobile Access Devices",
        "Network Switch (Connectivity Backbone)",
      ],
      benefitsHeading: "Key Benefit",
      benefits: [
        "Unified control of all parking and building systems",
        "Eliminates data silos and system fragmentation",
        "Reduced operational complexity and manual effort",
        "Scalable architecture for future technologies",
        "Seamless integration with existing infrastructure",
      ],
      problemHeading: "Problem We Solve",
      problemBody: "Parking and facility systems are often disconnected, with separate platforms for payments, access control, CCTV, and building management. This creates operational inefficiencies, data silos, higher maintenance costs, and limited visibility. HalaPark unifies them into one connected platform.",
      ctaLabel: "Talk to Our Team",
      ctaLink: "/contact",
    },
  ],
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
