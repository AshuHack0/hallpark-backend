import mongoose from "mongoose";

// A "Book a Free Consultation" submission from the Business page popup. Users
// pick one or more discussion topics (checkboxes, admin-managed) and submit
// their details. Separate from Contact and Proposal.
const consultationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    // The discussion topics the user ticked in the popup.
    topics: { type: [String], default: [] },
    // Optional preferred date/time note (free text).
    preferredTime: { type: String, trim: true },
    message: { type: String, trim: true },
    source: { type: String, trim: true, default: "website" },
    status: { type: String, enum: ["new", "read", "scheduled", "closed"], default: "new" },
  },
  { timestamps: true },
);

export const Consultation = mongoose.model("Consultation", consultationSchema);
