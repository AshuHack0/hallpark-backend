import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
    sections: { type: mongoose.Schema.Types.Mixed, default: {} },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Page = mongoose.model("Page", pageSchema);
