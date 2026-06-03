import { z } from "zod";
import { JobApplication } from "../models/JobApplication.js";

const jobApplicationSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  jobTitle: z.string().min(1),
  department: z.string().optional(),
  location: z.string().optional(),
  message: z.string().optional(),
  linkedIn: z.string().optional(),
  source: z.string().optional(),
});

export async function createJobApplication(req, res, next) {
  try {
    const data = jobApplicationSchema.parse(req.body);
    const application = await JobApplication.create(data);
    res.status(201).json({ ok: true, application });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid application payload", details: err.flatten() });
    }
    next(err);
  }
}

export async function listJobApplications(_req, res, next) {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.json({ applications });
  } catch (err) {
    next(err);
  }
}
