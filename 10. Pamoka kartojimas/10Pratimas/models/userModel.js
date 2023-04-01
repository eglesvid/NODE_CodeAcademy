import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
