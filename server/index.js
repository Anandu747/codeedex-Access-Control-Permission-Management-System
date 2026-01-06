import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB Connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error(err));

  mongoose.connection.once("open", () => {
  console.log("CONNECTED DATABASE:", mongoose.connection.name);
});

