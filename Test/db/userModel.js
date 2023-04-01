import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },
  email: {
    type: String,
    minLength: 5,
    required: true,
  },
  address: {
    type: String,
    minLength: 10,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
