import db from "../db/db.js";

export async function createNewCustomer(req, res) {
  try {
    const { name, address, phone } = req.body;

    const dbResponse = await db.query(
      `insert into customers(name, address, phone) values ('${name}', '${address}', '${phone}')
       returning id, name, address, phone`
    );

    res.json(dbResponse.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllCustomers(req, res) {
  try {
    const customers = await db.query("SELECT * FROM customers");

    res.json(customers.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
