import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Seeds the site-wide partnership popup:
//   node src/seed/partner-form.force.js         → popup copy in Site Settings only
//   node src/seed/partner-form.force.js --tick  → ALSO ticks "Open Partnership Form popup" on every partner CTA
//
// Ticking is safe before the frontend deploy: older frontends ignore the flag
// and keep using each button's link.

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

// [page slug, flag path under `sections`, label path under `sections` (sanity check), description]
const PARTNER_BUTTONS = [
  ["business", "transformParking.parkingPartnerCtaPopup", "transformParking.parkingPartnerCtaLabel", "Business · Parking Partner card"],
  ["business", "transformParking.servicePartnerCtaPopup", "transformParking.servicePartnerCtaLabel", "Business · Service Partner card"],
  ["business", "partnersShowcase.ctaPopup", "partnersShowcase.ctaLabel", "Business · Partners Showcase"],
  ["business", "partnersShowcase.ctaSectionPopup", "partnersShowcase.ctaSectionLabel", "Business · Ready to Partner section"],
  ["home", "aiPoweredParking.cards.1.popup", "aiPoweredParking.cards.1.ctaLabel", "Home · For Business card"],
  ["about", "cta.primaryCtaPopup", "cta.primaryCtaText", "About · final CTA primary"],
  ["solutions", "cta.secondaryPopup", "cta.secondaryLabel", "Solutions · final CTA secondary"],
  ["services", "partnersSection.ctaPopup", "partnersSection.ctaLabel", "Services · Clients & Partners line"],
];

const withTick = process.argv.includes("--tick");

async function findPage(col, slug) {
  return (await col.findOne({ slug })) || (await col.findOne({ page: slug }));
}

function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
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

  if (!withTick) {
    console.log("partner CTA tick boxes not changed (pass --tick)");
  } else {
    for (const [slug, flagPath, labelPath, desc] of PARTNER_BUTTONS) {
      const page = await findPage(col, slug);
      const label = page ? getPath(page.sections, labelPath) : undefined;
      if (!page || typeof label !== "string" || !label.trim()) {
        console.log(`SKIP ${desc}: button not found`);
        continue;
      }
      await col.updateOne({ _id: page._id }, { $set: { [`sections.${flagPath}`]: true } });
      console.log(`ticked ${desc} ("${label.trim()}")`);
    }
  }

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
