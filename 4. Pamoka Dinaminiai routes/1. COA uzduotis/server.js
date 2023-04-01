import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

const cars = {
  bmw: ["i3", "i8", "1 series", "3 series", "5 series"],
  mb: ["A class", "C class", "E class", "S class"],
  vw: ["Golf", "Arteon", "UP"],
};

app.get("/cars/:brand", (req, res) => {
  res.json(cars[req.params.brand]);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
