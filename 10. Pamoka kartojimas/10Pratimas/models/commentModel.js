import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  date: () => Date.now(),
  comment: String,
});

const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;
