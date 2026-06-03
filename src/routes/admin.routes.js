import { Router } from "express";
import {
  getPageAdmin,
  listPagesAdmin,
  updatePageAdmin,
} from "../controllers/pages.controller.js";
import { getStats, listQuotes } from "../controllers/quotes.controller.js";
import { listJobApplications } from "../controllers/jobApplications.controller.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.use(authRequired);

router.get("/stats", getStats);
router.get("/pages", listPagesAdmin);
router.get("/pages/:slug", getPageAdmin);
router.put("/pages/:slug", updatePageAdmin);
router.get("/quotes", listQuotes);
router.get("/job-applications", listJobApplications);

export default router;
