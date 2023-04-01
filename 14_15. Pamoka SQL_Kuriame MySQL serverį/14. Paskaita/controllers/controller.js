//1. Susiimportuojam db connectiona, kadangi su jo pagalba kreipsimes i postgres db
import DB from "../db/db.js";

export async function getAllProducts(req, res) {
  try {
    const products = await DB.query(
      "SELECT id, description, price, title FROM products"
    );
    res.json(products.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await DB.query(
      `select id, description, price, title from products where id=${id}`
    );
    res.json(product.rows[0]); //visalaik grazins array, kad ir vienas irasas bus. Gali but frontenderiai praso atsiusti tik viena objekta, o ne visa array. Todel paimam pirma elementa is to array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createNewProduct(req, res) {
  try {
    const { title, description, price } = req.body; //pirmu reikalu is req pasiimam data, kuria mums siuncia vartotojas, siuo atveju musu thunderclient (frontendo simuliatorius)

    const product =
      await DB.query(`insert into products (title, description, price)
        values ('${title}', '${description}', ${price})`);

    //nesikuriam atskiro objekto, kaip su mongoDB, o iskart darom query ir rasom inserta
    res.json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function updateProductById(req, res) {
  try {
    const { id } = req.params; //kuri irasa noresim paupdatint
    const { title, description, price } = req.body;
    const product = await DB.query(
      `update products set price=${price}, description='${description}', title='${title}' where id=${id}`
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await DB.query(`delete from products where id=${id}`);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function routeNotFound(req, res) {
  res.status(404).json({ error: "Endpoint not found" });
}
