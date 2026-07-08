import { Router } from "express";
import { createContact } from "../controllers/contact.controller.js";
import { getContactUploadSignature } from "../controllers/uploads.controller.js";

const router = Router();

router.post("/", createContact);
// Public signed-upload params for contact-form attachments (dedicated folder only).
router.get("/attachment-signature", getContactUploadSignature);

export default router;
