import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "services" },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
