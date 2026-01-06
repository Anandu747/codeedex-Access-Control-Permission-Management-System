import express from "express";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkPermission } from "../middlewares/permission.middleware.js";
import AuditLog from "../models/AuditLog.js";
import User from "../models/User.js";

const router = express.Router();

router.get(
  "/audit-logs",
  authMiddleware,
  checkPermission("AUDIT_VIEW"),
  async (req, res) => {
    const logs = await AuditLog.find().sort({ timestamp: -1 });
    res.json(logs);
  }
);


router.post(
  "/users",
  authMiddleware,
  checkPermission("USER_CREATE"),
  async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      isAdmin: false
    });

   
    await AuditLog.create({
      actor: req.user.email,
      action: "CREATED_USER",
      target: user.email
    });

    res.json({ message: "User created successfully" });
  }
);

export default router;
