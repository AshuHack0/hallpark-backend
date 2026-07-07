import { Router } from "express";
import { createJobApplication } from "../controllers/jobApplications.controller.js";
import { getResumeUploadSignature } from "../controllers/uploads.controller.js";

const router = Router();

router.post("/", createJobApplication);
// Public signed-upload params for the careers apply form (resumes folder only).
router.get("/resume-signature", getResumeUploadSignature);

export default router;
