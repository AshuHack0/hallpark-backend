import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? "development",
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/hallpark",
  jwtSecret: process.env.JWT_SECRET ?? "dev-jwt-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:3000,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    apiKey: process.env.CLOUDINARY_API_KEY ?? "",
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
    uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER ?? "halapark/faq-videos",
  },
  // Outgoing email for website submissions (contact, quotes, partner requests,
  // job applications, proposals, consultations). Sent over SMTP; when SMTP_HOST
  // and BREVO_API_KEY are both blank nothing is sent and a warning is logged —
  // submissions still save.
  mail: {
    // Brevo HTTP API (preferred when set) — no SMTP port needed on the host.
    brevoApiKey: process.env.BREVO_API_KEY ?? "",
    brevoSenderEmail: process.env.BREVO_SENDER_EMAIL ?? "",
    brevoSenderName: process.env.BREVO_SENDER_NAME ?? "HalaPark Website",
    host: process.env.SMTP_HOST ?? "",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: String(process.env.SMTP_SECURE ?? "false") === "true",
    user: process.env.SMTP_USER ?? "",
    pass: process.env.SMTP_PASS ?? "",
    from: process.env.MAIL_FROM ?? "HalaPark Website <no-reply@halapark.com>",
    to: process.env.NOTIFY_EMAIL ?? "support@halapark.com",
    // MAIL_DRY_RUN=true renders the email to the log instead of sending.
    dryRun: String(process.env.MAIL_DRY_RUN ?? "false") === "true",
  },
};
