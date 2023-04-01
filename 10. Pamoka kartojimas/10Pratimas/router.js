// GET/POST/DELETE Pratimas
// Dvi kolekcijos - "users" ir "comments".
// users turės: name, email. comments turės user_id, date ir comment.

// Keturi route'ai:
// GET /users/ atsiųs visus vartotojus;
// POST /users/ įrašys vieną vartotoją;
// GET /comments/ atsiųs visus komentarus ir jų vardus (t.y. date, comment ir name of user).
// DELETE /comments/:id ištrins vieną komentarą pagal jo ID.

import express from "express";
import {
  getAllUsers,
  createUser,
  addComment,
  getCommentsAndTheirUsers,
  deleteOneCommentByItsId,
} from "./controllers.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.post("/comments/:user_Id", addComment);
router.get("/comments", getCommentsAndTheirUsers);
router.delete("/comments/:id", deleteOneCommentByItsId);

export default router;
