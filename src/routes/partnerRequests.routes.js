import { Router } from "express";
import { createPartnerRequest } from "../controllers/partnerRequests.controller.js";
import { getPartnerDocumentUploadSignature } from "../controllers/uploads.controller.js";

const router = Router();

router.post("/", createPartnerRequest);
// Public signed-upload params for the optional supporting document (dedicated folder only).
router.get("/document-signature", getPartnerDocumentUploadSignature);

export default router;
