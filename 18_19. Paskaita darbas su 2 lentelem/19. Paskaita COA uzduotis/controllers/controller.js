import DB from "../db/db.js";

export async function getAllProducts(req, res) {
  try {
    const products = await DB.query(
      `select id, title, image, price from ecommerce_products`
    );

    res.json(products.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await DB.query(
      `SELECT id, title, image, price FROM ecommerce_products WHERE id = ${id}`
    );
    res.status(200).json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order =
      await DB.query(`SELECT ecommerce_products.id AS product_id, ecommerce_orders.id AS order_id, title, image, price, customer_name, customer_email
    FROM ecommerce_products JOIN ecommerce_orders on ecommerce_products.id = ecommerce_orders.product_id WHERE ecommerce_orders.id = ${id}`);

    res.status(200).json(order.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postNewProduct(req, res) {
  try {
    const { title, image, price } = req.body;

    const product = await DB.query(
      `INSERT INTO public.ecommerce_products (title, image, price) VALUES('${title}', '${image}', ${price}) returning id, title, image, price`
    );

    res.json(product.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Kaip gauti ip adresa:
// IP adresa galima gauti is req objekto
// const ip = req.connection.remoteAddress;
// ir sita ip galima issaugoti duomenu bazeje
// gali buti, kad ip kuri gausite pradzioje bus parasyta ‘::ffff:’, tai galite tiesiog istrinti sita dali

// Kaip issaugoti esama duomenu bazes laika:
// Kai rasot inserta prie values parasykit CURRENT_TIMESTAMP ir tas stulpelis uzsipildys esamu laiku
// INSERT INTO orders (product_id, customer_name, customer_email, timestamp)
// VALUES (12345, 'John Doe', 'johndoe@example.com', CURRENT_TIMESTAMP);

export async function postNewOrder(req, res) {
  try {
    const { customer_name, customer_email } = req.body;
    const product_id = req.params.id;
    const ip = req.ip.replace("::ffff:", "");

    const order =
      await DB.query(`INSERT INTO ecommerce_orders (customer_name, customer_email, product_id, ip, timestamp) 
        VALUES ('${customer_name}', '${customer_email}', ${product_id}, '${ip}', CURRENT_TIMESTAMP)
      returning id, product_id, customer_name, customer_email, ip, timestamp`);

    res.status(200).json(order.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await DB.query(`delete from ecommerce_products 
    where id=${id}`);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
