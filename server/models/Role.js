
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: String,
  permissions: [
    {
      key: String,
      scope: String
    }
  ]
});

export default mongoose.model("Role", roleSchema);
