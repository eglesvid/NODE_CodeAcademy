import express from "express";
// susiimporuoti ta viena dideli router
import router from "./src/routes/index.js";

const PORT = 3000;
const app = express();

// kad app naudotu musu router app.use(router);
app.use("/something", router); //prie situ routes, ka jau aprasem, galim pridet dalele kelio /something (= kad prie visu router pradzios prisidetu /something). Taigi, galinis endpoint butu /something/x

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
