import { z } from "zod";
import { Page } from "../models/Page.js";

const updatePageSchema = z.object({
  name: z.string().min(1).optional(),
  path: z.string().min(1).optional(),
  sections: z.record(z.any()).optional(),
  published: z.boolean().optional(),
});

export async function listPagesPublic(_req, res, next) {
  try {
    const pages = await Page.find({ published: true })
      .select("slug name path updatedAt")
      .sort({ name: 1 });
    res.json({ pages });
  } catch (err) {
    next(err);
  }
}

export async function getPagePublic(req, res, next) {
  try {
    const page = await Page.findOne({ slug: req.params.slug, published: true });
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.json({ page });
  } catch (err) {
    next(err);
  }
}

export async function listPagesAdmin(_req, res, next) {
  try {
    const pages = await Page.find().sort({ name: 1 });
    res.json({ pages });
  } catch (err) {
    next(err);
  }
}

export async function getPageAdmin(req, res, next) {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.json({ page });
  } catch (err) {
    next(err);
  }
}

export async function updatePageAdmin(req, res, next) {
  try {
    const data = updatePageSchema.parse(req.body);
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: data },
      { new: true, runValidators: true },
    );
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.json({ page });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid page data", details: err.flatten() });
    }
    next(err);
  }
}
