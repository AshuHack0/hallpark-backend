import { Router } from "express";
import {
  getPagePublic,
  listPagesPublic,
} from "../controllers/pages.controller.js";

const router = Router();

router.get("/", listPagesPublic);
router.get("/:slug", getPagePublic);

export default router;
