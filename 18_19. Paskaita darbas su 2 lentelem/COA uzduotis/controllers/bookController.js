import db from "../db/db.js";

export async function addNewBook(req, res) {
  try {
    const { id } = req.params;
    const { title, year } = req.body;

    const book =
      await db.query(`insert into books (author_id, title, year) values
    (${id}, '${title}', ${year}) returning id, title, author_id, year`);

    res.json(book.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getBookWithAuthor(req, res) {
  try {
    const { id } = req.params;
    const book =
      await db.query(`select books.id as book_id, name, surname, title, year from authors join books on authors.id = books.author_id where authors.id = ${id}
    `);

    res.json(book.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
