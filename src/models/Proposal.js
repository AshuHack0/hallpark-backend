import mongoose from "mongoose";

// A "Get Proposal" submission from the Business page popup. Users pick one or
// more solutions/services (checkboxes, admin-managed) and submit their details.
// Kept separate from Contact — this is a quotation/proposal request.
const proposalSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    // The solutions/services the user ticked in the popup.
    solutions: { type: [String], default: [] },
    message: { type: String, trim: true },
    attachments: {
      type: [
        {
          url: { type: String, required: true, trim: true },
          name: { type: String, trim: true },
          type: { type: String, trim: true },
        },
      ],
      default: [],
    },
    source: { type: String, trim: true, default: "website" },
    status: { type: String, enum: ["new", "read", "replied", "closed"], default: "new" },
  },
  { timestamps: true },
);

export const Proposal = mongoose.model("Proposal", proposalSchema);
