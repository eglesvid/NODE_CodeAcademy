import User from "./models/userModel.js";
import Comment from "./models/commentModel.js";
import mongoose from "mongoose";

export async function getAllUsers(req, res) {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createUser(req, res) {
  try {
    const { name, email } = req.body;

    const user = {
      name,
      email,
    };

    const userDB = await User.create(user);

    res.json(userDB);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addComment(req, res) {
  try {
    const { user_Id } = req.params;
    const { comment } = req.body;

    const userComment = await Comment.create({
      comment,
      user_Id: mongoose.Types.ObjectId(user_Id),
    });

    const user = await User.findById(user_Id);
    user.comments.push(mongoose.Types.ObjectId(userComment._id));
    userComment.save();

    res.json(userComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCommentsAndTheirUsers(req, res) {
  try {
    const comments = await Comment.find({}).populate("user_Id", {}, "users");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteOneCommentByItsId(req, res) {
  try {
    const { id } = req.params;
    const respDB = await Comment.findByIdAndDelete(id);

    res.json({
      success: true,
    });

    // db.collection("comments").deleteOne({
    //   _id: ObjectId("63ee8a5934a7a07d6da00056"),
    // });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
