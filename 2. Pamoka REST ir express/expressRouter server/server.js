const express = require("express");
const router = require("./router"); //jeigu norim susiimportuoti kazka is failu, reik konkreciai nurodyt
const app = express();

//galim cia rasyt visus app.get(), bet pasidarytu jovalas, todel tai padarom atskiram faile (router.js)
app.use(router);

app.listen(4000, () => {
  console.log("app is running on port 4000");
}); //padarom, kad pasileistu serveris
