import { Router } from "express";
import {
  getPageAdmin,
  listPagesAdmin,
  updatePageAdmin,
} from "../controllers/pages.controller.js";
import {
  getStats,
  listQuotes,
  getQuote,
  updateQuoteStatus,
  deleteQuote,
} from "../controllers/quotes.controller.js";
import {
  listJobApplications,
  getJobApplication,
  updateJobApplicationStatus,
  deleteJobApplication,
} from "../controllers/jobApplications.controller.js";
import { getUploadSignature } from "../controllers/uploads.controller.js";
import {
  listContacts,
  getContact,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.controller.js";
import {
  listProposals,
  updateProposalStatus,
  deleteProposal,
  listConsultations,
  updateConsultationStatus,
  deleteConsultation,
} from "../controllers/proposals.controller.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.use(authRequired);

router.get("/stats", getStats);
router.get("/pages", listPagesAdmin);
router.get("/pages/:slug", getPageAdmin);
router.put("/pages/:slug", updatePageAdmin);
router.get("/quotes", listQuotes);
router.get("/quotes/:id", getQuote);
router.patch("/quotes/:id/status", updateQuoteStatus);
router.delete("/quotes/:id", deleteQuote);
router.get("/job-applications", listJobApplications);
router.get("/job-applications/:id", getJobApplication);
router.patch("/job-applications/:id/status", updateJobApplicationStatus);
router.delete("/job-applications/:id", deleteJobApplication);
router.post("/uploads/signature", getUploadSignature);

router.get("/contacts", listContacts);
router.get("/contacts/:id", getContact);
router.patch("/contacts/:id/status", updateContactStatus);
router.delete("/contacts/:id", deleteContact);

router.get("/proposals", listProposals);
router.patch("/proposals/:id/status", updateProposalStatus);
router.delete("/proposals/:id", deleteProposal);

router.get("/consultations", listConsultations);
router.patch("/consultations/:id/status", updateConsultationStatus);
router.delete("/consultations/:id", deleteConsultation);

export default router;
