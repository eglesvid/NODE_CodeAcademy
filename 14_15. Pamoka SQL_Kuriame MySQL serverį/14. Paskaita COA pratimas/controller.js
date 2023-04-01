import DB from "./db.js";

export async function getServer(req, res) {
  try {
    const products = await DB.query(
      "SELECT id, description, price, title FROM products"
    );
    res.json({ success: true });
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function getShirts(req, res) {
  try {
    const { size } = req.params;
    const { limit } = req.query;
    if (size !== "null") {
      const shirts = await DB.query(
        `SELECT id, brand, model, size, price FROM public.shirts where size='${size}' order by price asc limit ${limit}`
      );

      res.json(shirts.rows);
    } else {
      const shirts = await DB.query(
        `SELECT id, brand, model, size, price FROM public.shirts order by price asc limit ${limit}`
      );
      res.json(shirts.rows);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function createShirt(req, res) {
  try {
    const { brand, model, size, price } = req.body;

    const shirt = await DB.query(`INSERT INTO public.shirts
          (brand, model, "size", price)
          VALUES('${brand}', '${model}', '${size}', ${price})`);

    res.json(shirt);
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function routeNotFound(req, res) {
  res.status(404).json({ error: "Endpoint not found" });
}
