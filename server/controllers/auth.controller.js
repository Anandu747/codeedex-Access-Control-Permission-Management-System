
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).populate("roles");
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, isAdmin: user.isAdmin });
};
