//? 1. Susikurkite naują node.js pratimą, įsidiekite express/cors.
//? 2. Sukurkite array, kuriame bus saugomi mašinų brand'ai.
//? 3. Sukurkite GET, kuris paduos visą array.
//? 4. Sukurkite POST, kuris į array įrašys naują automobilio brandą.
//? Testuokite su PostMan.

import express from "express";
import router from "./routes.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
