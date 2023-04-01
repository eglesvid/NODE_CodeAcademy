import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import router from "./router.js";
dotenv.config();

// 1. Sukurkite naują duomenų bazę ir dvi kolekcijas - "products" ir "categories".
// 2. Sukurkite dvi kategorijas (t.y. dokumentus "categories" kolekcijoje), kurie turės title ir description (pvz. "phones" ir "mobile phones are used for communicating and learning programming")
// 3. O tada kiekvienai kategorijai - po du produktus (iš viso - bus keturi dokumentai "products" kolekcijoje). Produktas turės: pavadinimą ir kainą (pvz.: iPhone 7 ir 370.00).
// 4. Sukurkite NodeJS Express REST serverį, kuris turės GET'ą /categories ir paduos visas kategorijas.
// 5. Sukurkite dar vieną route GET /products/, kuris paduos visus produktus su jų kategorijom (t.y. pavadinimas, kaina, kategorija - pvz. iPhone 7, 370.00, phones).
// 6. Sukurkite dar vieną route GET /categoryvalue/, šis paduos kiekvienos kategorijos produktų kainos sumą, pvz:

const PORT = process.env.PORT || 6000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose.connect(MONGO_URI, () => {
  console.log("connected");
});

const app = express();
app.use(router);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
