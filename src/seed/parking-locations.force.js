import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Creates the "Parking Locations" page (/parking-locations) — the single
// destination for the "Find My Parking", "Explore Parking" and "Explore Our
// Locations" buttons.
//
//   node src/seed/parking-locations.force.js          → create the page (skip if it exists)
//   node src/seed/parking-locations.force.js --reset  → also overwrite the section copy
//
// Only the page scaffolding and headings are seeded. The towers/projects,
// certificates and reviews lists are left EMPTY on purpose — they are real
// business facts and must be entered in the admin panel. Each section stays
// hidden on the website until it has at least one item.

const SECTIONS = {
  hero: {
    enabled: true,
    eyebrow: "Parking Locations",
    heading: "Our parking locations",
    headingGradient: "across the UAE",
    description:
      "Explore the towers and projects powered by HalaPark in Dubai, Abu Dhabi, Sharjah and Ajman — and find smart, secure parking wherever you're headed.",
    image: "",
    searchPlaceholder: "Search by tower, project or area",
    ar: {
      eyebrow: "مواقع المواقف",
      heading: "مواقع مواقفنا",
      headingGradient: "في جميع أنحاء الإمارات",
      description:
        "استكشف الأبراج والمشاريع المشغَّلة بواسطة هالا بارك في دبي وأبوظبي والشارقة وعجمان — واعثر على مواقف ذكية وآمنة أينما كنت متجهًا.",
      searchPlaceholder: "ابحث حسب البرج أو المشروع أو المنطقة",
    },
  },

  // Small figures shown under the hero copy (e.g. "40+ Towers").
  stats: { enabled: true, items: [] },

  locations: {
    enabled: true,
    eyebrow: "Towers & Projects",
    heading: "Explore parking",
    headingGradient: "by emirate",
    description:
      "Pick an emirate to see the buildings and projects where HalaPark parking is available.",
    allLabel: "All Emirates",
    emptyText: "No locations match your search yet.",
    emirates: [
      { key: "dubai", name: "Dubai", ar: { name: "دبي" } },
      { key: "abu-dhabi", name: "Abu Dhabi", ar: { name: "أبوظبي" } },
      { key: "sharjah", name: "Sharjah", ar: { name: "الشارقة" } },
      { key: "ajman", name: "Ajman", ar: { name: "عجمان" } },
    ],
    items: [],
    ar: {
      eyebrow: "الأبراج والمشاريع",
      heading: "استكشف المواقف",
      headingGradient: "حسب الإمارة",
      description: "اختر الإمارة لعرض المباني والمشاريع التي تتوفر فيها مواقف هالا بارك.",
      allLabel: "جميع الإمارات",
      emptyText: "لا توجد مواقع مطابقة لبحثك.",
    },
  },

  certificates: {
    enabled: true,
    eyebrow: "Certified & Compliant",
    heading: "Our certificates",
    headingGradient: "and accreditations",
    description: "The licences, approvals and standards behind every HalaPark site.",
    items: [],
    ar: {
      eyebrow: "معتمدون وملتزمون",
      heading: "شهاداتنا",
      headingGradient: "واعتماداتنا",
      description: "التراخيص والموافقات والمعايير التي تقف خلف كل موقع من مواقع هالا بارك.",
    },
  },

  reviews: {
    enabled: true,
    eyebrow: "Google Reviews",
    heading: "What drivers say",
    headingGradient: "about parking with us",
    description: "Real reviews from people who park with HalaPark every day.",
    rating: "",
    reviewCount: "",
    googleLabel: "Read all reviews on Google",
    googleLink: "",
    items: [],
    ar: {
      eyebrow: "تقييمات جوجل",
      heading: "ماذا يقول السائقون",
      headingGradient: "عن المواقف معنا",
      description: "تقييمات حقيقية من أشخاص يستخدمون مواقف هالا بارك يوميًا.",
      googleLabel: "اقرأ جميع التقييمات على جوجل",
    },
  },

  cta: {
    enabled: true,
    heading: "Looking for parking",
    headingGradient: "in your building?",
    description:
      "Tell us where you need HalaPark next and our team will get back to you with the options for your property.",
    primaryLabel: "Contact Us",
    primaryLink: "/contact",
    secondaryLabel: "Explore Our Services",
    secondaryLink: "/services",
    ar: {
      heading: "تبحث عن مواقف",
      headingGradient: "في مبناك؟",
      description:
        "أخبرنا أين تحتاج هالا بارك بعد ذلك وسيعود إليك فريقنا بالخيارات المناسبة لعقارك.",
      primaryLabel: "تواصل معنا",
      secondaryLabel: "استكشف خدماتنا",
    },
  },
};

const reset = process.argv.includes("--reset");

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("pages");

  const existing = await col.findOne({ slug: "parking-locations" });

  if (!existing) {
    await col.insertOne({
      slug: "parking-locations",
      name: "Parking Locations",
      path: "/parking-locations",
      sections: SECTIONS,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("✅ Created page: parking-locations");
  } else if (reset) {
    await col.updateOne(
      { slug: "parking-locations" },
      {
        $set: {
          name: "Parking Locations",
          path: "/parking-locations",
          // Keep whatever the admin already entered in the lists.
          sections: {
            ...SECTIONS,
            locations: {
              ...SECTIONS.locations,
              emirates: existing.sections?.locations?.emirates?.length
                ? existing.sections.locations.emirates
                : SECTIONS.locations.emirates,
              items: existing.sections?.locations?.items ?? [],
            },
            stats: { ...SECTIONS.stats, items: existing.sections?.stats?.items ?? [] },
            certificates: {
              ...SECTIONS.certificates,
              items: existing.sections?.certificates?.items ?? [],
            },
            reviews: { ...SECTIONS.reviews, items: existing.sections?.reviews?.items ?? [] },
          },
          published: true,
          updatedAt: new Date(),
        },
      },
    );
    console.log("♻️  Reset section copy on: parking-locations (lists kept)");
  } else {
    console.log("ℹ️  Page already exists — nothing changed. Use --reset to refresh the copy.");
  }

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error("❌ Seed failed:", err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
