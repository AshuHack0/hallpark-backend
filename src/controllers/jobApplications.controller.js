import { z } from "zod";
import { JobApplication } from "../models/JobApplication.js";

// Optional string fields may arrive as "" when left blank — coerce to undefined
// so Mongoose stores them as absent rather than as empty strings.
const optionalStr = z
  .string()
  .optional()
  .or(z.literal(""))
  .transform((v) => (v === "" ? undefined : v));

const jobApplicationSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  jobTitle: z.string().trim().min(1),
  department: optionalStr,
  location: optionalStr,
  message: optionalStr,
  linkedIn: optionalStr,
  resumeUrl: optionalStr,
  source: optionalStr,
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

export async function getJobApplication(req, res, next) {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json({ application });
  } catch (err) {
    next(err);
  }
}

export async function updateJobApplicationStatus(req, res, next) {
  const VALID = ["new", "reviewed", "contacted", "closed"];
  try {
    const { status } = req.body;
    if (!VALID.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID.join(", ")}` });
    }
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json({ application });
  } catch (err) {
    next(err);
  }
}

export async function deleteJobApplication(req, res, next) {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
