import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    tower: { type: String, trim: true },
    slots: { type: String, trim: true },
    message: { type: String, trim: true },
    source: { type: String, trim: true, default: "website" },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true },
);

export const Quote = mongoose.model("Quote", quoteSchema);
