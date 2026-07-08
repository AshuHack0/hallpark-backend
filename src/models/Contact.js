import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email:    { type: String, required: true, trim: true },
    phone:    { type: String, required: true, trim: true },
    company:  { type: String, trim: true },
    subject:  { type: String, trim: true, default: "General Enquiry" },
    message:  { type: String, required: true, trim: true },
    // Optional file attachments uploaded to Cloudinary from the contact form
    // (images or supporting documents). Stored as URL + basic metadata.
    attachments: {
      type: [
        {
          url:  { type: String, required: true, trim: true },
          name: { type: String, trim: true },
          type: { type: String, trim: true },
        },
      ],
      default: [],
    },
    source:   { type: String, trim: true, default: "website" },
    status:   { type: String, enum: ["new", "read", "replied", "closed"], default: "new" },
  },
  { timestamps: true },
);

export const Contact = mongoose.model("Contact", contactSchema);
