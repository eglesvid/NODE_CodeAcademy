import express from "express";
import dotenv from "dotenv";
dotenv.config(); //kodas padaryt, kad veiktu dotenv

const PORT = process.env.PORT || 3000; // kaip pasiekti? su process.env.PORT // || reiskia "arba" (jeigu jos ner, naudok 3000)

const app = express();

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
