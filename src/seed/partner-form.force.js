import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Seeds the site-wide partnership popup:
//   node src/seed/partner-form.force.js          → popup copy in Site Settings only
//   node src/seed/partner-form.force.js --links  → ALSO points every partner CTA at the popup
//
// Run --links only AFTER the frontend with PartnershipFormProvider is deployed —
// on an older frontend a "#partner-form" link does nothing when clicked.

const PARTNER_FORM_LINK = "#partner-form";

const PARTNERSHIP_FORM = {
  heading: "Become a Partner",
  subtitle: "Share a few details and our partnerships team will get in touch.",
  successTitle: "Request Received!",
  successMessage:
    "Thank you for your interest in partnering with HalaPark. Our partnerships team will get back to you shortly.",
  ar: {
    heading: "كن شريكًا",
    subtitle: "شاركنا بعض التفاصيل وسيتواصل معك فريق الشراكات لدينا.",
    successTitle: "تم استلام الطلب!",
    successMessage: "شكرًا لاهتمامك بالشراكة مع هالا بارك. سيتواصل معك فريق الشراكات قريبًا.",
  },
};

// [page slug, dotted path under `sections`, description]
const PARTNER_LINKS = [
  ["business", "transformParking.parkingPartnerCtaLink", "Business · Start Earning with HalaPark"],
  ["business", "transformParking.servicePartnerCtaLink", "Business · Partner With Us Today"],
  ["business", "partnersShowcase.ctaLink", "Business · Become a Partner"],
  ["business", "partnersShowcase.ctaSectionLink", "Business · Ready to Partner (Get in Touch)"],
  ["home", "aiPoweredParking.cards.1.href", "Home · Partner With Us"],
  ["about", "cta.primaryCtaLink", "About · Partner With HalaPark"],
  ["solutions", "cta.secondaryLink", "Solutions · Partner With Us"],
  ["services", "partnersSection.ctaLink", "Services · Want to become a partner? Get in touch"],
];

const withLinks = process.argv.includes("--links");

async function findPage(col, slug) {
  return (await col.findOne({ slug })) || (await col.findOne({ page: slug }));
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const col = mongoose.connection.db.collection("pages");

  const settings = await findPage(col, "settings");
  if (!settings) throw new Error("settings page not found");
  if (settings.sections?.partnershipForm?.heading) {
    console.log("settings.partnershipForm already set — left unchanged");
  } else {
    await col.updateOne({ _id: settings._id }, { $set: { "sections.partnershipForm": PARTNERSHIP_FORM } });
    console.log("settings.partnershipForm seeded");
  }

  if (withLinks) {
    for (const [slug, path, label] of PARTNER_LINKS) {
      const page = await findPage(col, slug);
      if (!page) {
        console.log(`SKIP ${label}: page "${slug}" not found`);
        continue;
      }
      await col.updateOne({ _id: page._id }, { $set: { [`sections.${path}`]: PARTNER_FORM_LINK } });
      console.log(`linked ${label} → ${PARTNER_FORM_LINK}`);
    }
  } else {
    console.log("partner CTA links not changed (pass --links after the frontend is deployed)");
  }

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
