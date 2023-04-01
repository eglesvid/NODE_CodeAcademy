const http = require("http"); //pacio node modulis, uztenka parasyti http (nereikia /. kelio nusirodyt)
const express = require("express");

const PORT = 3000; //port yra skaiciai narsykleje. Kad galetume ant localhost pasiekti kazkokius dalykus, tam yra port'ai

const movies = [
  { id: 1, name: "Harry Potter" },
  { id: 2, name: "Spiderman" },
  { id: 3, name: "Superman" },
];

const cars = [
  { id: 1, make: "Audi" },
  { id: 2, make: "BMW" },
  { id: 3, make: "Opel" },
];

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/cars":
      res.write(JSON.stringify(cars));
      res.end();
      break;
    case "/movies":
      res.write(JSON.stringify(movies));
      res.end();
      break;
    default:
      res.statusCode = 404;
      res.end("This does not exist");
  }
});

server.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
