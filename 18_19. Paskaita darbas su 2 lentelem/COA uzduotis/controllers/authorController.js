import db from "../db/db.js";

export async function addNewAuthor(req, res) {
  try {
    const { name, surname } = req.body;

    const dbResponse =
      await db.query(`insert into authors (name, surname) values
    ('${name}', '${surname}') returning id, name, surname 
    `);

    res.json(dbResponse.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllAuthorsAndTheirBooks(req, res) {
  try {
    const dbResponse =
      await db.query(`select authors.id as author_id, name, surname, count(books.id) from authors join books on authors.id = books.author_id group by authors.id
    `);

    res.json(dbResponse.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
