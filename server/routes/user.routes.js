import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email,
    isAdmin: req.user.isAdmin
  });
});

export default router;
