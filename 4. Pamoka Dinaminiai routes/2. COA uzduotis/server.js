import express from "express";
import dotenv from "dotenv";
import router from "./router.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(router);

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
