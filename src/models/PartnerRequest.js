import mongoose from "mongoose";

// A "Become a Partner" submission from the site-wide partnership popup. The
// same popup is opened by every partner CTA (Business, Home, About, Solutions,
// Services) — `source` records which button it came from.
const partnerRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    document: {
      url: { type: String, trim: true },
      name: { type: String, trim: true },
      type: { type: String, trim: true },
    },
    source: { type: String, trim: true, default: "website" },
    status: { type: String, enum: ["new", "read", "contacted", "closed"], default: "new" },
  },
  { timestamps: true },
);

export const PartnerRequest = mongoose.model("PartnerRequest", partnerRequestSchema);
