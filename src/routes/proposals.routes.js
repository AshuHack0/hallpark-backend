import { Router } from "express";
import {
  createProposal,
  createConsultation,
} from "../controllers/proposals.controller.js";

const router = Router();

// Public submission endpoints for the Business-page popups.
router.post("/proposals", createProposal);
router.post("/consultations", createConsultation);

export default router;
