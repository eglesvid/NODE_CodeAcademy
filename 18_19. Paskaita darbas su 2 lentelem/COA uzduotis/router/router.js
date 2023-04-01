import express from "express";
import {
  addNewAuthor,
  getAllAuthorsAndTheirBooks,
} from "../controllers/authorController.js";
import {
  addNewBook,
  getBookWithAuthor,
} from "../controllers/bookController.js";
const router = express.Router();

router.post("/author", addNewAuthor);

router.post("/author/:id/book", addNewBook);

//Pasirašome SQL JOIN, kuris atvaizduotų lentelę visų knygų su jų autoriais
// (books.id, authors.name, authors.surname, books.title, books.year).
router.get("/book/:id/author", getBookWithAuthor);

// Parašome SQL, kuris atvaizduotų visus autorius ir kiek jie knygų turi
// (t.y. author.id, author.name, author.surname, count(by books.author_id))
router.get("/author/book", getAllAuthorsAndTheirBooks);

export default router;
