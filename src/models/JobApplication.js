import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    department: { type: String, trim: true },
    location: { type: String, trim: true },
    message: { type: String, trim: true },
    linkedIn: { type: String, trim: true },
    resumeUrl: { type: String, trim: true },
    source: { type: String, trim: true, default: "careers" },
    status: { type: String, enum: ["new", "reviewed", "contacted", "closed"], default: "new" },
  },
  { timestamps: true },
);

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
