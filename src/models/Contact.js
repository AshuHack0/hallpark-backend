import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email:    { type: String, required: true, trim: true },
    phone:    { type: String, required: true, trim: true },
    company:  { type: String, trim: true },
    subject:  { type: String, trim: true, default: "General Enquiry" },
    message:  { type: String, required: true, trim: true },
    source:   { type: String, trim: true, default: "website" },
    status:   { type: String, enum: ["new", "read", "replied", "closed"], default: "new" },
  },
  { timestamps: true },
);

export const Contact = mongoose.model("Contact", contactSchema);
