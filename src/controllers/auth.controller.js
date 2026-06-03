import bcrypt from "bcryptjs";
import { z } from "zod";
import { User } from "../models/User.js";
import { signToken } from "../middleware/auth.js";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function signup(req, res, next) {
  try {
    const data = signupSchema.parse(req.body);
    const existing = await User.findOne({ email: data.email });

    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid signup data", details: err.flatten() });
    }
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid login data", details: err.flatten() });
    }
    return next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.sub).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    return next(err);
  }
}
