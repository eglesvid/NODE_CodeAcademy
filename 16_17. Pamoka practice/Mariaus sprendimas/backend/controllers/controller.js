import db from "../db/db.js";

export async function getAllCars(req, res) {
  try {
    // paimam visas masinas is duomenu bazes.
    const cars = await db.query(
      "SELECT id, title, image, price, numberplates FROM cars"
    );
    // atiduodu frontendui tik tai rows, nes visa kita frontui yra neidomi
    res.json(cars.rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getCarById(req, res) {
  try {
    const { id } = req.params;
    const car = await db.query(
      `SELECT id, title, image, price, numberplates FROM cars WHERE id = ${id}`
    );

    // Patikrinu kiek car.rows array yra elementu. jei nera nei vieno reiskia pagal toki id nera ne vienos masinos
    if (car.rows.length === 0) {
      res.json({
        message: `masina su id: ${id} neegzistuoja`,
      });
    } else {
      // Kai ieskome pagal ID visada tikimes, kad grazins tik viena rezultata, nes ID yra unikalus
      // Mum is duomenu bazes visada grazina ARRAY su elementais tad as paimu is array tik pirma (ir vieninteli) elementa
      res.json(car.rows[0]);
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function createNewCar(req, res) {
  try {
    const { title, image, price, numberplates } = req.body;
    // Atkreipkit demesi, kad aplinkui title image ir numberplates yra kabutes, taip darome, nes tos reiksmes yra stringai.
    // Aplink skaiciu (price) kabuciu nereikia, nes tai yra ne string
    const dbRes = await db.query(`
      INSERT INTO cars (title, image, price, numberplates)
      VALUES ('${title}', '${image}', ${price}, '${numberplates}')
    `);
    res.json({ message: "Nauja masina prideta prie duomenu bazes" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function deleteCarById(req, res) {
  try {
    const { id } = req.params;
    const dbRes = await db.query(`DELETE FROM cars WHERE id = ${id}`);

    // Patikrinu kiek eiluciu duomenu bazeje buvo paveikta virsuje esancio query
    // Jei nei nepaveikta nei viena eilute (dbRes.rowCount===0) reiskia nebuvo istrintas nei vienas irasas ir taip pranesu vartotojui
    // Kitu atveju viskas ok ir irgi tai pranesu vartotojui
    if (dbRes.rowCount === 0) {
      res.status(404).json({
        message: `car with id ${id} does not exist in the database`,
      });
    } else {
      res.json({ message: `car with id: ${id} deleted` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
