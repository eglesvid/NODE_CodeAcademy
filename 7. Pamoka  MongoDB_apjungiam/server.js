//praktiskai jokios logikos siame faile ner. cia apsirasom dalykus, kurie reikalingi serveriui

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes.js";

dotenv.config(); //kad veiktu dotenv

const PORT = process.env.PORT || 4000;
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, () => {
  console.log("Connected");
}); //jungiames prie duomenu bazes

const app = express(); //susikuriam app

app.use(express.json()); // nes naudosim post'a
app.use(router);

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
