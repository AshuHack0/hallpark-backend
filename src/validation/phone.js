import { z } from "zod";

// One phone/mobile rule for every website form (same as the frontend's
// src/lib/formValidation.js): digits with optional spaces, dashes, dots or
// brackets and an optional leading +; 7–15 digits in total (E.164 max 15).
export const PHONE_MESSAGE = "Enter a valid mobile number (7–15 digits, optionally starting with +).";

const isValidPhone = (v) => /^\+?[\d\s\-().]+$/.test(v) && (() => {
  const n = v.replace(/\D/g, "").length;
  return n >= 7 && n <= 15;
})();

export const phoneSchema = z.string().trim().min(1, PHONE_MESSAGE).refine(isValidPhone, PHONE_MESSAGE);

// Optional phone: "" / missing → undefined; when filled it must be valid.
export const optionalPhoneSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || isValidPhone(v), PHONE_MESSAGE);
