//? Sukurkite bendrinį GET route, kuris paduos visus duomenis.
//? Sukurkite dinaminį GET route, kur URL turės automobilio markę ir pagal ją prafiltruos, ir grąžins tik tuos žmones, kurie turi šį automobilį.
//? Sukurkite dinaminį GET route, kuris priims vartotojo id ir pagal jį grąžins atitinkamą vartotojo objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoti.
//? Sukurkite GET route, kuris grąžins visus el. paštus (grąžinamas formatas: ["anb@abc.com", "abc@abc.com", "abc@acb.com]).
//? Sukurkite GET route, į kurį pasikreipus, grąžins visų moterų (gender: Female) vardą ir pavardę (formatas: ["Rita Kazlauskaite", "Monika Simaskaite"]).
// eiliskumas yra svarbu! Jis eina nuo virsaus, reiskia jeigu virsutinis tinka - viskas ok, jei ne - einam i apacia
// kai siunciam request'a, jis didelio skirtumo nemato, eina ir ziuri visus routes nuo virsaus, ar jie atitinka kazkoki kriteriju. Jeigu pirmas yra /people/emails iskart ji pagaus ir toliau neis ir netikrins.
// Bet jeigu pirmas yra /people/:make, jis pagalvoja, kad tas emails, kuri mes parasem, yra parametras, kuri mes siunciam

import express from "express";
import people from "./db.js";

const router = express.Router();

router.get("/people", (req, res) => {
  res.json(people);
});

router.get("/people/emails", (req, res) => {
  const emails = people.map((person) => {
    return person.email;
  });

  res.json(emails);
});

router.get("/people/female", (req, res) => {
  const females = people.filter(
    (person) => person.gender.toLowerCase() === "female"
  ); // tikrinkim, kad visur is mazosios yra parasyta. Sitoj vietoj konvertuojam toLowerCase (bus nesvarbu, ar pvz., is mazosios/didziosios, ar viskas mazosiom/didziosiom parasyta, vis tiek viska pagaus teisingai)

  const fullNames = females.map(
    (person) => `${person.first_name} ${person.last_name}`
  );

  res.json(fullNames); //dabar turesim array su fullNames ir tiesiog ji grazinam
});

router.get("/people/:make", (req, res) => {
  const { make } = req.params;
  const filteredPeople = people.filter((person) => person.car === make);

  res.json(filteredPeople);
});

router.get("/people/find/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((p) => p.id === +id);

  res.json(person);
});

export default router;
