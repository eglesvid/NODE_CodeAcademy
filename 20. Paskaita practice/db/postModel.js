import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: Number,
    min: 0,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  body: {
    type: String,
    required: true,
    minLength: 10,
  },
});

const postModel = mongoose.model("posts", postSchema);

export default postModel;
