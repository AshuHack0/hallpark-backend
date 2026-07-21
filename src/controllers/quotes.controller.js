import { z } from "zod";
import { Quote } from "../models/Quote.js";
import { JobApplication } from "../models/JobApplication.js";
import { Contact } from "../models/Contact.js";

// Optional string fields may arrive as "" — coerce to undefined so Mongoose
// stores them as absent rather than empty strings.
const optionalStr = z
  .string()
  .optional()
  .or(z.literal(""))
  .transform((v) => (v === "" ? undefined : v));

const attachmentSchema = z.object({
  url: z.string().trim().url(),
  name: z.string().trim().max(255).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
  type: z.string().trim().max(120).optional().or(z.literal("")).transform((v) => (v ? v : undefined)),
});

const quoteSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  service: z.string().trim().min(1),
  tower: optionalStr,
  slots: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === "" || v === undefined || v === null ? undefined : String(v))),
  message: optionalStr,
  // Optional attachments — at most 5, each already uploaded to Cloudinary.
  attachments: z.array(attachmentSchema).max(5).optional().default([]),
  source: optionalStr,
});

export async function createQuote(req, res, next) {
  try {
    const data = quoteSchema.parse(req.body);
    const quote = await Quote.create(data);
    res.status(201).json({ ok: true, quote });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid quote payload", details: err.flatten() });
    }
    next(err);
  }
}

export async function listQuotes(_req, res, next) {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ quotes });
  } catch (err) {
    next(err);
  }
}

export async function getQuote(req, res, next) {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ error: "Quote not found" });
    res.json({ quote });
  } catch (err) {
    next(err);
  }
}

export async function updateQuoteStatus(req, res, next) {
  const VALID = ["new", "reviewed", "contacted", "closed"];
  try {
    const { status } = req.body;
    if (!VALID.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID.join(", ")}` });
    }
    const quote = await Quote.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!quote) return res.status(404).json({ error: "Quote not found" });
    res.json({ quote });
  } catch (err) {
    next(err);
  }
}

export async function deleteQuote(req, res, next) {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ error: "Quote not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

export async function getStats(_req, res, next) {
  try {
    const [
      quotesTotal, quotesNew,
      jobApplicationsTotal, jobApplicationsNew,
      contactsTotal, contactsNew,
    ] = await Promise.all([
      Quote.countDocuments(),
      Quote.countDocuments({ status: "new" }),
      JobApplication.countDocuments(),
      JobApplication.countDocuments({ status: "new" }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
    ]);
    res.json({
      quotesTotal, quotesNew,
      jobApplicationsTotal, jobApplicationsNew,
      contactsTotal, contactsNew,
    });
  } catch (err) {
    next(err);
  }
}
