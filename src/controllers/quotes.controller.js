import { z } from "zod";
import { Quote } from "../models/Quote.js";
import { JobApplication } from "../models/JobApplication.js";

const quoteSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  service: z.string().min(1),
  tower: z.string().optional(),
  slots: z.union([z.string(), z.number()]).optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export async function createQuote(req, res, next) {
  try {
    const data = quoteSchema.parse(req.body);
    const quote = await Quote.create({
      ...data,
      slots: data.slots !== undefined ? String(data.slots) : undefined,
    });
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

export async function getStats(_req, res, next) {
  try {
    const [quotesTotal, quotesNew, jobApplicationsTotal, jobApplicationsNew] = await Promise.all([
      Quote.countDocuments(),
      Quote.countDocuments({ status: "new" }),
      JobApplication.countDocuments(),
      JobApplication.countDocuments({ status: "new" }),
    ]);
    res.json({ quotesTotal, quotesNew, jobApplicationsTotal, jobApplicationsNew });
  } catch (err) {
    next(err);
  }
}
