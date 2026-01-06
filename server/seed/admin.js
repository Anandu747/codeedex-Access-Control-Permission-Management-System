import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.DB);

  const hashedPassword = await bcrypt.hash("password", 10);

  await User.deleteMany({ email: "admin@test.com" });

  await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: hashedPassword,
    isAdmin: true,
    directPermissions: [
      { key: "AUDIT_VIEW", scope: "GLOBAL" },
      { key: "USER_CREATE", scope: "GLOBAL" }
    ]
  });

  console.log(" Admin user created with permissions");
  process.exit();
}

seedAdmin();
