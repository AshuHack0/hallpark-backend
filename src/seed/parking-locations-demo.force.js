import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// DEMO CONTENT for the Parking Locations page — so the page can be shown to the
// client before the real towers, certificates and reviews are collected.
//
//   node src/seed/parking-locations-demo.force.js --apply  → fill the page with samples
//   node src/seed/parking-locations-demo.force.js --clear  → remove ONLY the samples
//
// Every sample row carries `demo: true`, so --clear never touches anything the
// client has added in the admin panel.
//
// ⚠️  The certificates and reviews below are PLACEHOLDERS, not real claims or
// real customers. Replace or clear them before the site goes live.

const IMG = "https://res.cloudinary.com/dmm6a4ksm/image/upload";
const photo = (p) => `${IMG}/${p}`;

const HERO_IMAGE = photo("v1784879064/halapark/faq-videos/rjbevkbgp95wsvtqrmib.webp");

const STATS = [
  { value: "40+", label: "Towers & Projects", ar: { label: "برجًا ومشروعًا" } },
  { value: "4", label: "Emirates Covered", ar: { label: "إمارات مغطاة" } },
  { value: "12,000+", label: "Parking Bays", ar: { label: "موقف سيارة" } },
  { value: "24/7", label: "Support", ar: { label: "دعم متواصل" } },
];

const LOCATIONS = [
  {
    name: "Marina Heights Tower",
    emirate: "dubai",
    area: "Dubai Marina, Dubai",
    tag: "Now Live",
    image: photo("v1784129507/halapark/faq-videos/ru7vnize7nk741pzkhfb.jpg"),
    description:
      "Covered residential parking with barrier-free entry and app-based visitor passes.",
    features: ["Barrier-Free Entry", "EV Charging", "24/7 Access"],
    ar: {
      name: "برج مارينا هايتس",
      area: "دبي مارينا، دبي",
      tag: "متاح الآن",
      description: "مواقف سكنية مغطاة مع دخول بدون حواجز وتصاريح زوار عبر التطبيق.",
      features: ["دخول بدون حواجز", "شحن كهربائي", "وصول على مدار الساعة"],
    },
  },
  {
    name: "Business Bay Central",
    emirate: "dubai",
    area: "Business Bay, Dubai",
    tag: "Now Live",
    image: photo("v1784129516/halapark/faq-videos/tcm1qtergc2rnzoptad9.jpg"),
    description:
      "Multi-level commercial parking with hourly and monthly plans for tenants and visitors.",
    features: ["Hourly & Monthly", "Valet On Demand", "CCTV Monitored"],
    ar: {
      name: "بيزنس باي سنترال",
      area: "الخليج التجاري، دبي",
      tag: "متاح الآن",
      description: "مواقف تجارية متعددة الطوابق مع باقات بالساعة والشهر للمستأجرين والزوار.",
      features: ["بالساعة والشهر", "خدمة صف السيارات", "مراقبة بالكاميرات"],
    },
  },
  {
    name: "Lakeside Cluster Plaza",
    emirate: "dubai",
    area: "Jumeirah Lakes Towers, Dubai",
    tag: "",
    image: photo("v1784129548/halapark/faq-videos/spn4jwgiayldvfm2olco.webp"),
    description: "Shared parking across the cluster with live availability in the HalaPark app.",
    features: ["Live Availability", "Cashless Payment", "Covered Parking"],
    ar: {
      name: "ليك سايد كلاستر بلازا",
      area: "أبراج بحيرات جميرا، دبي",
      description: "مواقف مشتركة على مستوى المجمع مع توفر لحظي عبر تطبيق هالا بارك.",
      features: ["توفر لحظي", "دفع إلكتروني", "مواقف مغطاة"],
    },
  },
  {
    name: "Corniche Park Plaza",
    emirate: "abu-dhabi",
    area: "Corniche Road, Abu Dhabi",
    tag: "Now Live",
    image: photo("v1784129557/halapark/faq-videos/p8qql3icvroowblu4hye.jpg"),
    description: "Public parking steps from the Corniche, with pay-as-you-go and pay-later options.",
    features: ["Public Parking", "Pay Later", "EV Charging"],
    ar: {
      name: "كورنيش بارك بلازا",
      area: "شارع الكورنيش، أبوظبي",
      tag: "متاح الآن",
      description: "مواقف عامة على بعد خطوات من الكورنيش مع خيارات الدفع الفوري والدفع اللاحق.",
      features: ["مواقف عامة", "الدفع لاحقًا", "شحن كهربائي"],
    },
  },
  {
    name: "Reem Bay Residences",
    emirate: "abu-dhabi",
    area: "Al Reem Island, Abu Dhabi",
    tag: "",
    image: photo("v1783587641/halapark/faq-videos/yyhfndx7dhhrntsh5leo.jpg"),
    description: "Resident bays with plate-recognition access and guest parking managed in-app.",
    features: ["Plate Recognition", "Guest Passes", "Covered Parking"],
    ar: {
      name: "ريم باي ريزيدنسز",
      area: "جزيرة الريم، أبوظبي",
      description: "مواقف للسكان مع دخول بالتعرف على اللوحات وإدارة مواقف الضيوف عبر التطبيق.",
      features: ["التعرف على اللوحات", "تصاريح الضيوف", "مواقف مغطاة"],
    },
  },
  {
    name: "Al Majaz Waterfront Tower",
    emirate: "sharjah",
    area: "Al Majaz, Sharjah",
    tag: "Now Live",
    image: photo("v1783587476/halapark/faq-videos/kdfkl3nyyssrwwp3rzm8.jpg"),
    description: "Waterfront parking with short-stay rates and direct access to the promenade.",
    features: ["Short Stay", "Cashless Payment", "CCTV Monitored"],
    ar: {
      name: "برج المجاز ووترفرونت",
      area: "المجاز، الشارقة",
      tag: "متاح الآن",
      description: "مواقف على الواجهة المائية بأسعار للإقامة القصيرة ووصول مباشر إلى الممشى.",
      features: ["إقامة قصيرة", "دفع إلكتروني", "مراقبة بالكاميرات"],
    },
  },
  {
    name: "Al Nahda Business Centre",
    emirate: "sharjah",
    area: "Al Nahda, Sharjah",
    tag: "",
    image: photo("v1784130916/halapark/faq-videos/anvhzbc04ulecfmvc07h.jpg"),
    description: "Office parking with monthly staff plans and reserved bays for visitors.",
    features: ["Monthly Plans", "Reserved Bays", "24/7 Access"],
    ar: {
      name: "مركز النهدة للأعمال",
      area: "النهدة، الشارقة",
      description: "مواقف مكتبية مع باقات شهرية للموظفين ومواقف محجوزة للزوار.",
      features: ["باقات شهرية", "مواقف محجوزة", "وصول على مدار الساعة"],
    },
  },
  {
    name: "Ajman Corniche Residences",
    emirate: "ajman",
    area: "Ajman Corniche, Ajman",
    tag: "Coming Soon",
    image: photo("v1783060851/halapark/faq-videos/uqchc4niisx4irt4rhvu.webp"),
    description: "Residential and visitor parking along the Ajman Corniche, launching soon.",
    features: ["Visitor Parking", "Covered Parking", "App Booking"],
    ar: {
      name: "عجمان كورنيش ريزيدنسز",
      area: "كورنيش عجمان، عجمان",
      tag: "قريبًا",
      description: "مواقف للسكان والزوار على امتداد كورنيش عجمان، تُفتتح قريبًا.",
      features: ["مواقف الزوار", "مواقف مغطاة", "حجز عبر التطبيق"],
    },
  },
];

const CERTIFICATES = [
  {
    title: "ISO 9001:2015",
    issuer: "Quality Management System",
    ar: { title: "آيزو 9001:2015", issuer: "نظام إدارة الجودة" },
  },
  {
    title: "ISO 27001",
    issuer: "Information Security Management",
    ar: { title: "آيزو 27001", issuer: "إدارة أمن المعلومات" },
  },
  {
    title: "Municipality Approved",
    issuer: "Licensed parking operator",
    ar: { title: "معتمد من البلدية", issuer: "مشغّل مواقف مرخّص" },
  },
  {
    title: "PCI DSS Compliant",
    issuer: "Secure card payments",
    ar: { title: "متوافق مع PCI DSS", issuer: "مدفوعات بطاقات آمنة" },
  },
];

const REVIEWS = [
  {
    name: "Ahmed K.",
    rating: "5",
    location: "Marina Heights Tower, Dubai",
    date: "2 weeks ago",
    text: "No more driving around looking for a bay. The app shows what's free before I even arrive, and the gate opens on its own.",
    ar: {
      name: "أحمد ك.",
      location: "برج مارينا هايتس، دبي",
      date: "قبل أسبوعين",
      text: "لم أعد أدور بحثًا عن موقف. التطبيق يعرض المواقف الفارغة قبل وصولي، والبوابة تفتح تلقائيًا.",
    },
  },
  {
    name: "Sara M.",
    rating: "5",
    location: "Business Bay Central, Dubai",
    date: "1 month ago",
    text: "Booking a monthly spot took two minutes. Payment is automatic and I get a receipt every month.",
    ar: {
      name: "سارة م.",
      location: "بيزنس باي سنترال، دبي",
      date: "قبل شهر",
      text: "حجز موقف شهري استغرق دقيقتين. الدفع تلقائي وأستلم إيصالًا كل شهر.",
    },
  },
  {
    name: "Rashid A.",
    rating: "4",
    location: "Corniche Park Plaza, Abu Dhabi",
    date: "3 weeks ago",
    text: "Clean, well lit and easy to find. Pay-later is very handy when I'm in a rush.",
    ar: {
      name: "راشد أ.",
      location: "كورنيش بارك بلازا، أبوظبي",
      date: "قبل ثلاثة أسابيع",
      text: "نظيف ومضاء جيدًا وسهل الوصول. خيار الدفع اللاحق مفيد جدًا عندما أكون مستعجلًا.",
    },
  },
  {
    name: "Layla H.",
    rating: "5",
    location: "Al Majaz Waterfront Tower, Sharjah",
    date: "1 week ago",
    text: "I park here every weekend. The EV chargers are always working and the rates are clear up front.",
    ar: {
      name: "ليلى ح.",
      location: "برج المجاز ووترفرونت، الشارقة",
      date: "قبل أسبوع",
      text: "أركن هنا كل نهاية أسبوع. شواحن السيارات الكهربائية تعمل دائمًا والأسعار واضحة مسبقًا.",
    },
  },
  {
    name: "Omar S.",
    rating: "5",
    location: "Reem Bay Residences, Abu Dhabi",
    date: "2 months ago",
    text: "Guest passes used to be a headache for the building. Now residents send them from the app in seconds.",
    ar: {
      name: "عمر س.",
      location: "ريم باي ريزيدنسز، أبوظبي",
      date: "قبل شهرين",
      text: "كانت تصاريح الضيوف مشكلة للمبنى. الآن يرسلها السكان من التطبيق خلال ثوانٍ.",
    },
  },
  {
    name: "Fatima R.",
    rating: "4",
    location: "Al Nahda Business Centre, Sharjah",
    date: "1 month ago",
    text: "Our staff plan covers the whole team and the reports make it simple to manage each month.",
    ar: {
      name: "فاطمة ر.",
      location: "مركز النهدة للأعمال، الشارقة",
      date: "قبل شهر",
      text: "باقة الموظفين تغطي الفريق بالكامل والتقارير تجعل الإدارة الشهرية سهلة.",
    },
  },
];

const apply = process.argv.includes("--apply");
const clear = process.argv.includes("--clear");

function stamp(rows) {
  return rows.map((row) => ({ ...row, demo: true }));
}

// Keep anything the client added; only the rows we stamped are demo rows.
function withoutDemo(list) {
  return (Array.isArray(list) ? list : []).filter((row) => row?.demo !== true);
}

async function main() {
  if (!apply && !clear) {
    console.log("Nothing to do. Use --apply to add the demo content, or --clear to remove it.");
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("pages");

  const page = await col.findOne({ slug: "parking-locations" });
  if (!page) {
    console.error("❌ Page not found. Run: npm run seed:parking-locations");
    await mongoose.disconnect();
    process.exit(1);
  }

  const s = page.sections ?? {};

  if (clear) {
    s.stats = { ...(s.stats ?? {}), items: withoutDemo(s.stats?.items) };
    s.locations = { ...(s.locations ?? {}), items: withoutDemo(s.locations?.items) };
    s.certificates = { ...(s.certificates ?? {}), items: withoutDemo(s.certificates?.items) };
    s.reviews = {
      ...(s.reviews ?? {}),
      items: withoutDemo(s.reviews?.items),
      rating: s.reviews?.demoRating ? "" : (s.reviews?.rating ?? ""),
      reviewCount: s.reviews?.demoRating ? "" : (s.reviews?.reviewCount ?? ""),
      demoRating: false,
    };
    if (s.hero?.image === HERO_IMAGE) s.hero.image = "";
    await col.updateOne({ slug: "parking-locations" }, { $set: { sections: s, updatedAt: new Date() } });
    console.log("🧹 Demo content removed (anything added in the admin panel was kept).");
    await mongoose.disconnect();
    return;
  }

  // --apply: replace previous demo rows, keep the client's own rows.
  s.hero = { ...(s.hero ?? {}), image: (s.hero?.image || "").trim() || HERO_IMAGE };
  s.stats = { ...(s.stats ?? {}), items: [...withoutDemo(s.stats?.items), ...stamp(STATS)] };
  s.locations = { ...(s.locations ?? {}), items: [...withoutDemo(s.locations?.items), ...stamp(LOCATIONS)] };
  s.certificates = {
    ...(s.certificates ?? {}),
    items: [...withoutDemo(s.certificates?.items), ...stamp(CERTIFICATES)],
  };
  s.reviews = {
    ...(s.reviews ?? {}),
    rating: (s.reviews?.rating || "").trim() || "4.8",
    reviewCount: (s.reviews?.reviewCount || "").trim() || "Based on 312 Google reviews",
    ar: {
      ...(s.reviews?.ar ?? {}),
      reviewCount: (s.reviews?.ar?.reviewCount || "").trim() || "استنادًا إلى 312 تقييمًا على جوجل",
    },
    demoRating: true,
    items: [...withoutDemo(s.reviews?.items), ...stamp(REVIEWS)],
  };

  await col.updateOne({ slug: "parking-locations" }, { $set: { sections: s, updatedAt: new Date() } });
  console.log(
    `✅ Demo content added: ${LOCATIONS.length} locations, ${CERTIFICATES.length} certificates, ${REVIEWS.length} reviews, ${STATS.length} figures.`,
  );
  console.log("⚠️  Samples only — replace them, or run --clear, before the site goes live.");
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error("❌ Failed:", err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
