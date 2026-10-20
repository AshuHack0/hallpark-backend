import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// Forwards every website submission to the team inbox (env.mail.to). Sending
// never blocks or fails the request: callers fire-and-forget and errors are
// only logged.

let transporter = null;
let warnedUnconfigured = false;

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// Minimal nodemailer-shaped transport over Brevo's HTTP API, so the rest of
// this file doesn't care which one is configured.
function brevoTransport() {
  return {
    async sendMail({ to, replyTo, subject, text, html }) {
      const res = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: { "api-key": env.mail.brevoApiKey, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          sender: { name: env.mail.brevoSenderName, email: env.mail.brevoSenderEmail },
          to: [{ email: to }],
          ...(replyTo ? { replyTo: { email: replyTo } } : {}),
          subject,
          textContent: text,
          htmlContent: html,
        }),
      });
      if (!res.ok) throw new Error(`Brevo ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return res.json();
    },
  };
}

function getTransporter() {
  if (transporter) return transporter;
  if (env.mail.dryRun) {
    transporter = nodemailer.createTransport({ jsonTransport: true });
  } else if (env.mail.brevoApiKey && env.mail.brevoSenderEmail) {
    transporter = brevoTransport();
  } else if (env.mail.host) {
    transporter = nodemailer.createTransport({
      host: env.mail.host,
      port: env.mail.port,
      secure: env.mail.secure,
      auth: env.mail.user ? { user: env.mail.user, pass: env.mail.pass } : undefined,
    });
  }
  return transporter;
}

const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

const LABELS = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  companyName: "Company",
  subject: "Subject",
  message: "Message",
  service: "Service",
  tower: "Tower / project",
  slots: "Parking slots",
  jobTitle: "Position",
  department: "Department",
  location: "Location",
  linkedIn: "LinkedIn",
  resumeUrl: "Resume / CV",
  birthDate: "Date of birth",
  hearAbout: "Heard about us via",
  solutions: "Solutions of interest",
  topics: "Topics",
  preferredTime: "Preferred time",
  source: "Submitted from",
};

// Fields never worth emailing (internal bookkeeping).
const SKIP = new Set(["_id", "__v", "status", "createdAt", "updatedAt", "id"]);

function fileList(items) {
  return (Array.isArray(items) ? items : [])
    .filter((f) => f && f.url)
    .map((f) => ({ name: f.name || "file", url: f.url }));
}

// Turns a saved record into ordered [label, value] rows plus a list of files.
function rowsFor(record) {
  const rows = [];
  const files = [];
  for (const [key, raw] of Object.entries(record)) {
    if (SKIP.has(key) || raw === undefined || raw === null || raw === "") continue;
    if (key === "attachments" || key === "documents") { files.push(...fileList(raw)); continue; }
    if (key === "document") { files.push(...fileList([raw])); continue; }
    if (key === "resumeUrl") { files.push({ name: "Resume / CV", url: raw }); continue; }
    const label = LABELS[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
    const value = Array.isArray(raw) ? raw.join(", ") : raw instanceof Date ? raw.toISOString() : String(raw);
    if (value.trim()) rows.push([label, value]);
  }
  return { rows, files };
}

function render(kind, record) {
  const { rows, files } = rowsFor(record);
  const when = new Date(record.createdAt || Date.now()).toUTCString();
  const text = [
    `New ${kind} from the HalaPark website`,
    `Received: ${when}`,
    "",
    ...rows.map(([l, v]) => `${l}: ${v}`),
    ...(files.length ? ["", "Files:", ...files.map((f) => `- ${f.name}: ${f.url}`)] : []),
    "",
    "This submission is also available in the admin panel.",
  ].join("\n");
  const html = `
  <div style="font-family:Segoe UI,Arial,sans-serif;max-width:640px;margin:0 auto;color:#0A1B33">
    <div style="background:#0A1B33;color:#fff;padding:18px 24px;border-radius:14px 14px 0 0">
      <p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.75">HalaPark website</p>
      <h2 style="margin:6px 0 0;font-size:20px">New ${escapeHtml(kind)}</h2>
    </div>
    <div style="border:1px solid #E4EAF2;border-top:0;padding:8px 24px 20px;border-radius:0 0 14px 14px">
      <p style="font-size:12px;color:#667085">Received ${escapeHtml(when)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([l, v]) =>
              `<tr><td style="padding:8px 0;color:#667085;vertical-align:top;width:38%">${escapeHtml(l)}</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      ${
        files.length
          ? `<p style="margin:16px 0 6px;font-size:13px;color:#667085">Files</p><ul style="margin:0;padding-left:18px;font-size:14px">${files
              .map((f) => `<li><a href="${escapeHtml(f.url)}" style="color:#0088FF">${escapeHtml(f.name)}</a></li>`)
              .join("")}</ul>`
          : ""
      }
      <p style="margin-top:20px;font-size:12px;color:#98A2B3">This submission is also available in the admin panel.</p>
    </div>
  </div>`;
  return { text, html };
}

/**
 * Email a website submission to the team inbox. Fire-and-forget: resolves to
 * true when a message was handed to the transport, false otherwise.
 * @param {string} kind  e.g. "contact inquiry", "job application"
 * @param {object} record  the saved document (plain object or Mongoose doc)
 */
export async function notifySubmission(kind, record) {
  try {
    const transport = getTransporter();
    if (!transport) {
      if (!warnedUnconfigured) {
        warnedUnconfigured = true;
        console.warn("[mailer] Neither BREVO_API_KEY nor SMTP_HOST is set — website submissions are not being emailed.");
      }
      return false;
    }
    const data = typeof record?.toObject === "function" ? record.toObject() : { ...record };
    const { text, html } = render(kind, data);
    const replyTo = typeof data.email === "string" && data.email.includes("@") ? data.email : undefined;
    const info = await transport.sendMail({
      from: env.mail.brevoApiKey ? `${env.mail.brevoSenderName} <${env.mail.brevoSenderEmail}>` : env.mail.from,
      to: env.mail.to,
      replyTo,
      subject: `[HalaPark] New ${kind}${data.fullName ? ` — ${data.fullName}` : ""}`,
      text,
      html,
    });
    if (env.mail.dryRun) console.log("[mailer:dry-run]", info.message);
    return true;
  } catch (err) {
    console.error("[mailer] failed to send submission email:", err?.message || err);
    return false;
  }
}
