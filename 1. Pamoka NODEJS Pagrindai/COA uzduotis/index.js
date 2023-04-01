const casual = require("casual");

let city = casual.city;
let randomNumber = Math.floor(Math.random() * 10 + 1);
console.log(city, randomNumber);
console.log(
  casual.name_suffix + " " + casual.first_name + " " + casual.last_name
);

//Ryckos sprendimas:
// const casual = require("casual");

// console.log(casual.city);
// console.log(Math.floor(Math.random() * 10 + 1));
// console.log(casual.suffix + " " + casual.first_name + " " + casual.last_name);
