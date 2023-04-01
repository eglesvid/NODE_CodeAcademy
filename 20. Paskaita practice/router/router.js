import express from "express";
import {
  getAllPosts,
  getPostsWithTitle,
  getPostsWithBody,
  createNewPost,
  getPostsById,
} from "../controllers/controllers.js";
const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/title", getPostsWithTitle);
router.get("/posts/body", getPostsWithBody);
router.get("/posts/:id", getPostsById);
router.post("/posts", createNewPost);

export default router;
