
import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  key: String,
  scope: { type: String, enum: ["SELF", "TEAM", "GLOBAL"] },
  startsAt: Date,
  expiresAt: Date,
  revoked: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  directPermissions: [permissionSchema],
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  isAdmin: Boolean
});

export default mongoose.model("User", userSchema);
