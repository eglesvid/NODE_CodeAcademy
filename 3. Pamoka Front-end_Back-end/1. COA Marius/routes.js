import express from "express";
import cars from "./db.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json(cars);
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { make } = req.body;

  cars.push(make);

  res.json({
    success: true,
  });
});

export default router;
