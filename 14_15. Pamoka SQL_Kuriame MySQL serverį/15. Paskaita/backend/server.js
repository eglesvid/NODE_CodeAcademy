import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json()); //kad posts normaliai veiktu
app.use(router);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
