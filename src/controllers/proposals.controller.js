import { z } from "zod";
import { Proposal } from "../models/Proposal.js";
import { Consultation } from "../models/Consultation.js";

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

// ── Proposals ────────────────────────────────────────────────────────────────
const proposalSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  company: optionalStr,
  solutions: z.array(z.string().trim().min(1)).max(50).optional().default([]),
  message: optionalStr,
  attachments: z.array(attachmentSchema).max(5).optional().default([]),
  source: optionalStr,
});

const PROPOSAL_STATUSES = ["new", "read", "replied", "closed"];

export async function createProposal(req, res, next) {
  try {
    const data = proposalSchema.parse(req.body);
    const proposal = await Proposal.create(data);
    res.status(201).json({ ok: true, proposal });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid proposal payload", details: err.flatten() });
    }
    next(err);
  }
}

export async function listProposals(_req, res, next) {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.json({ proposals });
  } catch (err) {
    next(err);
  }
}

export async function updateProposalStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!PROPOSAL_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${PROPOSAL_STATUSES.join(", ")}` });
    }
    const proposal = await Proposal.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });
    res.json({ proposal });
  } catch (err) {
    next(err);
  }
}

export async function deleteProposal(req, res, next) {
  try {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

// ── Consultations ────────────────────────────────────────────────────────────
const consultationSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  company: optionalStr,
  topics: z.array(z.string().trim().min(1)).max(50).optional().default([]),
  preferredTime: optionalStr,
  message: optionalStr,
  source: optionalStr,
});

const CONSULTATION_STATUSES = ["new", "read", "scheduled", "closed"];

export async function createConsultation(req, res, next) {
  try {
    const data = consultationSchema.parse(req.body);
    const consultation = await Consultation.create(data);
    res.status(201).json({ ok: true, consultation });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid consultation payload", details: err.flatten() });
    }
    next(err);
  }
}

export async function listConsultations(_req, res, next) {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json({ consultations });
  } catch (err) {
    next(err);
  }
}

export async function updateConsultationStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!CONSULTATION_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${CONSULTATION_STATUSES.join(", ")}` });
    }
    const consultation = await Consultation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!consultation) return res.status(404).json({ error: "Consultation not found" });
    res.json({ consultation });
  } catch (err) {
    next(err);
  }
}

export async function deleteConsultation(req, res, next) {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) return res.status(404).json({ error: "Consultation not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
