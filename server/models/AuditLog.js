
import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
  actor: String,
  action: String,
  target: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("AuditLog", auditSchema);
