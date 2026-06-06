import { z } from "zod";
import { Contact } from "../models/Contact.js";

const optionalStr = z
  .string()
  .optional()
  .or(z.literal(""))
  .transform((v) => (v === "" ? undefined : v));

const contactSchema = z.object({
  fullName: z.string().trim().min(1),
  email:    z.string().trim().email(),
  phone:    z.string().trim().min(1),
  company:  optionalStr,
  subject:  optionalStr,
  message:  z.string().trim().min(1),
  source:   optionalStr,
});

const VALID_STATUSES = ["new", "read", "replied", "closed"];

export async function createContact(req, res, next) {
  try {
    const data = contactSchema.parse(req.body);
    const contact = await Contact.create(data);
    res.status(201).json({ ok: true, contact });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid contact payload", details: err.flatten() });
    }
    next(err);
  }
}

export async function listContacts(_req, res, next) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ contacts });
  } catch (err) {
    next(err);
  }
}

export async function getContact(req, res, next) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json({ contact });
  } catch (err) {
    next(err);
  }
}

export async function updateContactStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}` });
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json({ contact });
  } catch (err) {
    next(err);
  }
}

export async function deleteContact(req, res, next) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
