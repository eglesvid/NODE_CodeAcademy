import mongoose from "mongoose";
//kad susikurtume modeli, reikia mongoose
//dabar galim sukurt schemas su sito mongoose pagalba
//schema issisaugom kazkokiam kintamajam
//kad sukurtume schema, naudojam mongoose.Schema. Skliausteliuose nurodom, kaip ji turi atrodyti

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 200,
    required: true, //nurodom ar privalomas field
  },
  age: {
    type: Number,
    min: 1,
    max: 150,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(), // tsg Date.now() ivyktu 1x, neapskaiciuos kiekviena karta naujos datos, kai bandysim irasyt nauja user. Kad apeitume sita dalyka, isidedam arrow function, kuris grazina Date.now() (kad butu teisingos datos)
    immutable: true, // pirma karta, kai surasinejam, galim irasyt kazka kito. Tiktai veliau, kai bandysim paupdateint, to neleis padaryti. Zodziu: immutable reiskia, kad negalesim patys pakeisti datos, galim tik pasiimt sita info
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  hobbies: [String], // jeigu [], t.y. nieko nenusirodysim, galesim beleka det. Bet dazniausiai norim, kad info griezciau butu aprasyta, todel stengiames i vidu visad kazka irasyt
  address: {
    street: String,
    number: String,
  },
});

// schema svarbi, nes:
// A) turim grieztesni apsirasyma, kaip turi atrodyti musu duomenys. Server js galim prideti maziau, bet negalim prideti daugiau. Jeigu ten bandyciau deti, ko nesu apsirases, praignoruotu adresa, neides jo i db
// B) leidzia  ideti papildomu apribojimu
// pagal sita schema susikuriam modeli-->
// pirmas parametras nurodo, kaip vadinsis musu collection ir antra, paduodam schema, kuria norim, kad naudotu
// Paprastai kiekvienam modeliui susikuriam po atskira file

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
