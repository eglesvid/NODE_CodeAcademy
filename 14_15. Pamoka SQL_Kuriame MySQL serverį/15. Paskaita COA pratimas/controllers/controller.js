import db from "../db/db.js";

export async function getItems(req, res) {
  try {
    const { limit } = req.query;

    const items = await db.query(
      `SELECT id, title FROM items ORDER BY id asc limit ${limit}`
    );

    res.json(items.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postItem(req, res) {
  try {
    const { title } = req.body;

    const item = await db.query(
      `INSERT INTO public.items (title) VALUES('${title}') returning id, title`
    );

    res.json(item.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteItem(req, res) {
  try {
    const { id } = req.params;

    const item = await db.query(`DELETE FROM public.items WHERE id=${id}`);

    if (item.rowCount === 0) {
      res.json({ message: "Item by this ID do not exist" });
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
