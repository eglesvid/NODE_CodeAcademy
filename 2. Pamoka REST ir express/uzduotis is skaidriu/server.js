const express = require("express");
const cors = require("cors");

const PORT = 3000;
const app = express(); //iskvieciam express f-ija, kuri sukuria app

const names = ["Alex", "Rose", "Megan"];

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
); //taip padarydami, sakom siusk is bet kur. todel galim pasiduot, ka mes norim acceptint

//kad serveris galetu apdorot json, reikia-->
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.json(names);
});

app.get("/api/users/:firstLetter", (req, res) => {
  const { firstLetter } = req.params; //destruction budas (zino, kad req yra objektas ir is jo params istrauks firstLetter ir iskart i kintamaji ides ( cia vietoj const firstLetter = req.params.firstLetter)

  const filtered = names.filter(
    (name) => name[0] === firstLetter.toUpperCase()
  );

  res.json(filtered);
});

app.post("/api/users", (req, res) => {
  //   const { name } = req.query;
  console.log(req.body);
  const { name } = req.body; //jei pvz. is kitos vietos info imam

  names.push(name);

  res.json(names);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
