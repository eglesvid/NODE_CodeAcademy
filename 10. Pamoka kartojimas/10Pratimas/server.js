import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose.connect(MONGO_URI, () => {
  console.log("connected");
});

const app = express();
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
