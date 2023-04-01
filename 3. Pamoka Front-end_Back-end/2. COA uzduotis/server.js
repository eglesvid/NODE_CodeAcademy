//? 1. Sukurk NodeJS projektą, kuris paduos ir priims
//? žmonių vardus iš array (GET ir POST).
//? Sukurkite atskirą aplanką su front-end'u,
//? tegul jame būna du puslapiai -
//? vienas, su forma paduoti vardą į back-end'ą (Fetch POST);
//? antras puslapis - kuris turi unordered list su visais vardais (Fetch GET).
//?
//? 2. Pakoreguok NodeJS, kad būtų galima pridėti ne tik vardus, bet ir pavardes.
//? Dabar mūsų array saugos ne stringus (["Petras", "Jonas", "Antanas"]),
//? bet objektus ([{name: "Petras", surname: "Slekys"}, {name: "Jonas", surname: "Kazlauskas"}]).
//? Back-end'e GET request koreguoti nereikės - jis ir taip paduoda visą array ir nesigilina kas jame;
//? tačiau POST jau reikės - štai iš paduoto req.body reikės pasiimti vardą ir pavardę,
//? juos įdėt į objektą, o tą objektą - į array.
//? Front-end'e reikės pakoreguoti, kad forma turėtų du input'us ir juos teisingai
//? atvaizduotų Fetch'o body;
//? taip pat, atvaizduojant, reikės parašyti name + " " + surname, kad atvaizduotų
//? unordered list'e ne objektą, o pilnus vardus tvarkingai.

import express from "express";
import cors from "cors";

const people = [
  { name: "Petras", surname: "Slekys" },
  { name: "Jonas", surname: "Kazlauskas" },
];

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json(people);
});

// app.post("/:name", (req, res) => {
//   const { name } = req.params;

//   people.push(name);

//   res.json({
//     success: true,
//   });
// });
// post dabar pasikeicia, nes priiminesim ne tik varda. O jeigu priimam daugiau info, tai patogiau daryti ne per parametrus, o per body:
// also thunderclient eisim i body ir siusim json
app.post("/", (req, res) => {
  const { name, surname } = req.body;

  const person = {
    name,
    surname,
  };

  people.push(person);

  res.json({
    success: true,
  });
});

app.listen(PORT, (req, res) => {
  console.log(`app listening on port ${PORT}`);
});
