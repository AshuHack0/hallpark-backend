import { Router } from "express";
import { createJobApplication } from "../controllers/jobApplications.controller.js";

const router = Router();

router.post("/", createJobApplication);

export default router;
