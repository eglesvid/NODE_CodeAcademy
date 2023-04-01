import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/routes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
