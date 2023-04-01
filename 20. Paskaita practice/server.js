import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/router.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "";

//naujas prisijungimas:
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
