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
    // Up to 5 supporting documents (uploaded to Cloudinary from the popup).
    documents: {
      type: [
        {
          url: { type: String, trim: true },
          name: { type: String, trim: true },
          type: { type: String, trim: true },
        },
      ],
      default: [],
    },
    // Legacy single-document field kept so older records still read.
    document: {
      url: { type: String, trim: true },
      name: { type: String, trim: true },
      type: { type: String, trim: true },
    },
    // Which kind of partnership the visitor chose in the popup:
    // "parking" (Become a Parking Partner) or "service" (Become a Service
    // Partner). Empty on requests submitted before the field existed.
    partnerType: { type: String, enum: ["parking", "service", ""], default: "" },
    source: { type: String, trim: true, default: "website" },
    status: { type: String, enum: ["new", "read", "contacted", "closed"], default: "new" },
  },
  { timestamps: true },
);

export const PartnerRequest = mongoose.model("PartnerRequest", partnerRequestSchema);
