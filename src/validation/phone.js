import { z } from "zod";

// One mobile-number rule for every website form (same as the frontend's
// src/lib/formValidation.js): UAE mobiles only — +971 followed by 9 digits
// starting with 50, 52, 54, 55, 56 or 58. Accepts "+971 50 123 4567",
// "00971501234567", "0501234567", "501234567" …; stores "+971 50 123 4567".
export const PHONE_MESSAGE =
  "Enter a valid UAE mobile number: 9 digits after +971 starting with 50, 52, 54, 55, 56 or 58.";

function uaeDigits(v) {
  let d = String(v ?? "").replace(/\D/g, "");
  if (d.startsWith("00971")) d = d.slice(5);
  else if (d.startsWith("971") && d.length > 9) d = d.slice(3);
  return d.replace(/^0+/, "");
}

const isValidPhone = (v) => {
  if (!/^\+?[\d\s\-().]+$/.test(String(v ?? "").trim())) return false;
  const d = uaeDigits(v);
  return /^5[024568]\d{7}$/.test(d) && !/^5\d(\d)\1{6}$/.test(d);
};

const format = (v) => {
  const d = uaeDigits(v);
  return `+971 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`;
};

export const phoneSchema = z
  .string()
  .trim()
  .min(1, PHONE_MESSAGE)
  .refine(isValidPhone, PHONE_MESSAGE)
  .transform(format);

// Optional phone: "" / missing → undefined; when filled it must be valid.
export const optionalPhoneSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || isValidPhone(v), PHONE_MESSAGE)
  .transform((v) => (v === undefined ? undefined : format(v)));
