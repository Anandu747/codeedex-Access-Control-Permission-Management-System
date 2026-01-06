import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    
  console.log("LOGIN BODY:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await User.findOne({ email });
  console.log("USER FOUND:", user);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("PASSWORD MATCH:", isMatch)
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    }
  });
});

export default router;
