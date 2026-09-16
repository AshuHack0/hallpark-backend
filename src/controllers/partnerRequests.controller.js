import { z } from "zod";
import { PartnerRequest } from "../models/PartnerRequest.js";

const optionalStr = z
  .string()
  .optional()
  .or(z.literal(""))
  .transform((v) => (v === "" ? undefined : v));

const partnerRequestSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  companyName: z.string().trim().min(1).max(160),
  email: z.string().trim().email(),
  // Digits, spaces and a leading + only — no letters.
  phone: z.string().trim().min(7).max(25).regex(/^\+?[\d\s\-()]+$/),
  message: z.string().trim().min(1).max(3000),
  document: z
    .object({
      url: z.string().trim().url(),
      name: optionalStr,
      type: optionalStr,
    })
    .optional(),
  source: optionalStr,
});

const STATUSES = ["new", "read", "contacted", "closed"];

export async function createPartnerRequest(req, res, next) {
  try {
    const data = partnerRequestSchema.parse(req.body);
    const partnerRequest = await PartnerRequest.create(data);
    res.status(201).json({ ok: true, partnerRequest });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid partnership request", details: err.flatten() });
    }
    next(err);
  }
}

export async function listPartnerRequests(_req, res, next) {
  try {
    const partnerRequests = await PartnerRequest.find().sort({ createdAt: -1 });
    res.json({ partnerRequests });
  } catch (err) {
    next(err);
  }
}

export async function updatePartnerRequestStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${STATUSES.join(", ")}` });
    }
    const partnerRequest = await PartnerRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!partnerRequest) return res.status(404).json({ error: "Partner request not found" });
    res.json({ partnerRequest });
  } catch (err) {
    next(err);
  }
}

export async function deletePartnerRequest(req, res, next) {
  try {
    const partnerRequest = await PartnerRequest.findByIdAndDelete(req.params.id);
    if (!partnerRequest) return res.status(404).json({ error: "Partner request not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
