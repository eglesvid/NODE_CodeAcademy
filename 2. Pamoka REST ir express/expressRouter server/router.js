const express = require("express"); //importuojam
const router = express.Router(); //is ekspreso pasiimam router'i

router.get("/", (req, res) => {
  res.json({ hello: "this is written in a router" });
}); //apsirasinejam taip pat, tik ant router'io

router.post("/", (req, res) => {
  res.json({ hello: "this is" });
});

module.exports = router; //eksportuojam
