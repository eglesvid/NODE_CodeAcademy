import express from "express";
import cors from "cors";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

const cars = [
  {
    name: "BMW",
  },
  {
    name: "Audi",
  },
  {
    name: "VW",
  },
  {
    name: "Skoda",
  },
];

app.get("/cars", (req, res) => {
  res.json(cars);
});

app.post("/cars", (req, res) => {
  const { name } = req.body;
  const car = {
    name,
  };

  cars.push(car);

  res.json({
    success: true,
  });

  //   const car = req.body;

  //   cars.push(car);

  //   res.json({
  //     success: true,
  //   });
});

app.listen(PORT, (req, res) => {
  console.log(`App listening on port ${PORT}`);
});
