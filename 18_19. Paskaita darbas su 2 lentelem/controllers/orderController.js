import db from "../db/db.js";

export async function createNewOrder(req, res) {
  try {
    const { id } = req.params;
    const { description, price } = req.body;

    const order = await db.query(
      `insert into orders (description, customers_id, price) values ('${description}', ${id}, ${price}) returning id, description, customers_id, price`
    );

    res.json(order.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllCustomersOrderById(req, res) {
  try {
    const { id } = req.params;
    const orders = await db.query(
      `select customers.id as customer_id, name, address, phone, description, price, orders.id order_id from customers join orders on customers.id = orders.customers_id where customers.id = ${id} `
    );

    res.json(orders.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//jeigu norim daugiau orderiu prideti
export async function addOrdersBulk(req, res) {
  try {
    const { id } = req.params;
    const { data } = req.body;
    console.log(data);

    let query = "insert into orders (description, customers_id , price) values";

    //tiek, kiek data yra array elementu, tiek kartu prie stringo galo reiks prideti dali su skirtingom reiksmem viduj
    data.forEach((item) => {
      query += `('${item.description}', ${id}, '${item.price}'),`;
    }); //kad irasytume kita, reikalingas kablelis

    //kad nuimtume ta kableli is query galo:
    query = query.slice(0, query.length - 1);

    //kad grazintu normaliai kazka:
    query += " returning description, customers_id, price";

    console.log(query);

    const orders = await db.query(query);

    res.json(orders.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
