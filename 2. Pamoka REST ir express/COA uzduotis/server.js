//? PRAKTIKA
//? Sukurkite NodeJS projektą, kuris GET / paduos automobilių
//? brandus (t.y. array su automobilių brandais:
//? pvz. ["BMW", "VW, "Porsche"]).
//? Su atskiru aplanku, kur bus front-end'as (index.html)
//? pasiimkite šiuos duomenis (naudojant Fetch) ir
//? atvaizduokite juos unordered list'e.

import express from "express";
import cors from "cors";

const PORT = 3000;
const app = express();

app.use(cors());

const cars = ["BMW", "VW", "Porsche"];

app.get("/", cors(), (req, res) => {
  res.json(cars);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
