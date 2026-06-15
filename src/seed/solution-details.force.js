/**
 * Non-destructive seed for the Solutions page detail content.
 *
 * Unlike `solutions.force.js` (which $sets the ENTIRE sections object and would
 * wipe any CMS edits), this script:
 *   1. Reads the existing "solutions" page from the database
 *   2. Adds a `slug` to each existing solutions.cards item (preserving images/text)
 *   3. Sets ONLY `sections.details` (the blog-style per-solution pages)
 * Everything else on the page is left exactly as-is.
 *
 * Run:  node src/seed/solution-details.force.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Page } from "../models/Page.js";

dotenv.config();

const slugify = (s = "") =>
  s
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Map a card title → canonical detail slug, so existing CMS cards line up with
// the detail pages even if their titles were lightly edited.
const TITLE_TO_SLUG = {
  "smart parking management": "smart-parking-management",
  "automated access control": "automated-access-control",
  "parking guidance system": "parking-guidance-system",
  "mobile & digital experience": "mobile-digital-experience",
  "digital valet operations": "digital-valet-operations",
  "ev charging integration": "ev-charging-integration",
  "ai & parking analytics": "ai-parking-analytics",
};

const DETAILS = [
  {
    slug: "smart-parking-management",
    eyebrow: "Smart Parking Management",
    title: "Centralized Control for Every Parking Facility",
    intro:
      "HalaPark gives operators a single, real-time view of occupancy, access, and revenue across every facility — replacing manual processes with intelligent automation and centralized control.",
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
    problemBody:
      "Most parking facilities run on disconnected, manual systems with little real-time visibility. This leads to congestion, underused space, revenue leakage, and high operational overhead. HalaPark centralizes everything into one intelligent platform.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "automated-access-control",
    eyebrow: "Automated Access Control",
    title: "Seamless, Secure Vehicle Access",
    intro:
      "ANPR cameras and smart barrier systems let vehicles enter and exit without tickets or staff intervention — secure, fast, and fully automated.",
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
    problemBody:
      "Manual ticketing and barrier control create bottlenecks, security gaps, and a poor user experience. HalaPark automates the full access journey with AI cameras and smart barriers integrated into one platform.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "parking-guidance-system",
    eyebrow: "Parking Guidance System",
    title: "Real-Time Wayfinding That Reduces Congestion",
    intro:
      "Smart displays and sensors guide drivers straight to available spaces — cutting search time, easing congestion, and improving the in-facility experience.",
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
    problemBody:
      "Drivers circling for spaces cause congestion, frustration, and wasted capacity. HalaPark's guidance system uses live data and smart signage to route drivers directly to open bays.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "mobile-digital-experience",
    eyebrow: "Mobile & Digital Experience",
    title: "Parking in the Palm of Your Hand",
    intro:
      "A unified mobile and digital experience for reservations, cashless payments, subscriptions, and contactless parking — all from one app.",
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
    problemBody:
      "Cash-based, on-site-only parking is slow and inconvenient. HalaPark digitizes the full journey — discovery, booking, payment, and support — into one seamless app experience.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "digital-valet-operations",
    eyebrow: "Digital Valet Operations",
    title: "Structured, Trackable Valet Workflows",
    intro:
      "Digital ticketing, vehicle tracking, and retrieval management bring structure and accountability to valet operations.",
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
    problemBody:
      "Paper-based valet is error-prone, slow, and hard to audit. HalaPark digitizes valet end-to-end with tickets, tracking, and retrieval workflows in one system.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "ev-charging-integration",
    eyebrow: "EV Charging Integration",
    title: "Integrated EV Charging & Smart Billing",
    intro:
      "Bring EV charging into your parking ecosystem with integrated charging management, smart billing, and real-time monitoring.",
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
    problemBody:
      "EV charging is often a siloed, manually billed add-on. HalaPark integrates charging into the same platform as parking — with smart billing, monitoring, and reservations.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "ai-parking-analytics",
    eyebrow: "AI & Parking Analytics",
    title: "Turn Parking Data Into Decisions",
    intro:
      "Advanced occupancy analytics, traffic insights, predictive trends, and reporting dashboards help you optimize operations and revenue.",
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
    problemBody:
      "Without analytics, operators run blind — guessing at demand, pricing, and capacity. HalaPark surfaces real-time and predictive insights so every decision is backed by data.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
  {
    slug: "seamless-integrations",
    eyebrow: "Seamless Integrations",
    title: "End-to-End Connected Infrastructure for Smart Parking",
    intro:
      "HalaPark connects with existing infrastructure to create a unified operational ecosystem without disrupting current systems. It integrates multiple technologies into one intelligent platform for centralized control and real-time operations.",
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
    problemBody:
      "Parking and facility systems are often disconnected, with separate platforms for payments, access control, CCTV, and building management. This creates operational inefficiencies, data silos, higher maintenance costs, and limited visibility. HalaPark unifies them into one connected platform.",
    ctaLabel: "Talk to Our Team",
    ctaLink: "/contact",
  },
];

async function seedDetails() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const page = await Page.findOne({ slug: "solutions" });
    if (!page) {
      console.error("❌ 'solutions' page not found. Run `npm run seed:solutions` first.");
      await mongoose.connection.close();
      process.exit(1);
      return;
    }

    const sections = page.sections || {};

    // 1) Add slugs to existing cards (preserve everything else: image, text, etc.)
    const existingCards = Array.isArray(sections.solutions?.cards)
      ? sections.solutions.cards
      : [];
    let cardsUpdated = 0;
    const cardsWithSlugs = existingCards.map((card) => {
      if (card.slug) return card;
      const slug = TITLE_TO_SLUG[(card.title || "").toLowerCase().trim()] || slugify(card.title);
      cardsUpdated += 1;
      return { ...card, slug };
    });

    // 2) Build the $set update — only touch details + cards (with slugs).
    const update = { "sections.details": DETAILS };
    if (existingCards.length > 0) {
      update["sections.solutions.cards"] = cardsWithSlugs;
    }

    await Page.updateOne({ slug: "solutions" }, { $set: update });

    console.log(`✅ sections.details set (${DETAILS.length} solution detail pages)`);
    if (existingCards.length > 0) {
      console.log(`✅ sections.solutions.cards: ${cardsUpdated} card(s) got a new slug, ${existingCards.length - cardsUpdated} already had one (images/text preserved)`);
    } else {
      console.log("ℹ️  No existing solutions.cards found to slug-tag (left untouched).");
    }
    console.log("\nDetail slugs:");
    DETAILS.forEach((d, i) => console.log(`  ${i + 1}. /solutions/${d.slug}`));

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDetails();
