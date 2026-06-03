import { Router } from "express";
import { createQuote } from "../controllers/quotes.controller.js";

const router = Router();

router.post("/", createQuote);

export default router;
