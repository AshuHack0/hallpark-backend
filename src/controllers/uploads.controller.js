import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary.js";
import { env } from "../config/env.js";

/**
 * Returns the parameters an authenticated admin needs to upload a file
 * directly to Cloudinary (signed upload). The API secret is used here to
 * compute the signature but is never sent to the client.
 *
 * The client then POSTs the file to:
 *   https://api.cloudinary.com/v1_1/<cloudName>/<resourceType>/upload
 * with fields: file, api_key, timestamp, signature, folder.
 */
export async function getUploadSignature(_req, res, next) {
  try {
    if (!isCloudinaryConfigured()) {
      return res.status(503).json({
        error:
          "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.",
      });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = env.cloudinary.uploadFolder;

    // Only the params that are sent to Cloudinary (besides file/api_key) are signed.
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      env.cloudinary.apiSecret,
    );

    res.json({
      cloudName: env.cloudinary.cloudName,
      apiKey: env.cloudinary.apiKey,
      timestamp,
      folder,
      signature,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Public variant used by the careers "apply" form to upload a resume directly
 * to Cloudinary. Scoped to a dedicated resumes folder; the signature only
 * authorizes that folder, nothing else.
 */
export async function getResumeUploadSignature(_req, res, next) {
  try {
    if (!isCloudinaryConfigured()) {
      return res.status(503).json({ error: "Uploads are not available right now." });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = `${env.cloudinary.uploadFolder}/resumes`;

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      env.cloudinary.apiSecret,
    );

    res.json({
      cloudName: env.cloudinary.cloudName,
      apiKey: env.cloudinary.apiKey,
      timestamp,
      folder,
      signature,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Public variant used by the Contact form to upload attachments (images or
 * supporting documents) directly to Cloudinary. Scoped to a dedicated
 * contact-attachments folder; the signature only authorizes that folder.
 */
export async function getContactUploadSignature(_req, res, next) {
  try {
    if (!isCloudinaryConfigured()) {
      return res.status(503).json({ error: "Uploads are not available right now." });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = `${env.cloudinary.uploadFolder}/contact-attachments`;

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      env.cloudinary.apiSecret,
    );

    res.json({
      cloudName: env.cloudinary.cloudName,
      apiKey: env.cloudinary.apiKey,
      timestamp,
      folder,
      signature,
    });
  } catch (err) {
    next(err);
  }
}
