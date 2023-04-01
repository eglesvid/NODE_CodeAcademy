import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./User.js"; //cia yra user modelis
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

//prijungs prie duomenu bazes:
mongoose.connect(
  MONGO_URI,
  () => {
    console.log("connected to MongoDB");
  },
  (e) => {
    console.log(e);
  }
);

//reiks async f-iju, kadangi bendravimas su db vyks per promises:

async function getUsersWhere() {
  // const users = await User.where("name").equals("Marius");
  // const users = await User.where("age").gt(26);
  // const users = await User.where("age").gte(26); //26 ir daugiau
  // const users = await User.where("age").lt(27).or();
  const users = await User.where("age")
    .lt(40)
    .sort({ age: -1, name: 1, createdAt: 1 })
    .limit(2)
    .skip(4); //is pradziu rikiuoja pagal age, o jeigu du tokio paties amziaus suranda, sortinam pagal name abc. td paims su limit du pirmus ir td praskipinis keturis
  //su limit siunciam uzklausa ir nurodom parametre, kiek mes norim atgal gaut rezultatu
  //jeigu einu i kt. psl, darau antra uzklausa, kur vel nurodau, kad noriu gaut 20 batu, bet nenoriu, kad grazintu vel 20 tu paciu batu. Todel i skip irasom 20

  console.log(users);
}

getUsersWhere();

async function getUsers() {
  try {
    // const users = await User.find(
    //   {
    //     name: "Tadas",
    //     age: 26,
    //     createdAt: new Date("2000-10-04"),
    //   },
    //   { name: true, age: true }
    // ); //pvz. su:findById("63e529f5fa2b41a41c550ab3")
    // const users = await User.count({ name: "Marius" }); //db greiciau apdoroja count negu .length, del to geriau sita naudot
    const user = await User.findOne({ "address.number": 6 }); //grazina viena pati pirma user, kurio tas ir tas yra toks. //nenaudoti findByIdAndUpdate, nes jis praignoruotu musu apribojimus, t. y. praignoruotu musu, pvz., uzdeta minLength //gtk: key reiktu nurodyt kelia iki musu querinamo value -> "address.number.asdsd.asdas":

    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
}

// getUsers();

async function updateUsers() {
  //   const user = await User.updateOne(
  //     { name: "Marius" },
  //     { $set: { name: "Andrius", age: 40 } }
  //   );

  const users = await User.updateMany(
    { age: 26 },
    {
      address: {
        street: "Kauno",
        number: "7B",
      },
    }
  );
  console.log(users);
}
// updateUsers();

async function deleteUsers() {
  //   const users = await User.findByIdAndDelete("63e51e3bb26a41c8cfc80e41");
  const users = await User.deleteMany({
    name: "Tadas",
  });

  console.log(users);
}

// deleteUsers();

async function createUser() {
  //   const user = new User({
  //     name: "Marius",
  //     age: 26,
  //   });
  //   user.save(); //kad idetume i db, reik iskviest sita metoda
  //
  // KITAS BUDAS: (nereiks kviest user.save(), nes auto sukurs)

  try {
    const user = await User.create({
      name: "Marius",
      age: 26,
      hobbies: ["Bowling", "Jogging"],
      address: {
        street: "Vilniaus gatve",
        number: 6,
      },
      createdAt: new Date("2000-10-04"),
    }); //su sita komanda sukuriam nauja user, bet jei norim kazka dar pakeisti, galim rasyt user.name = "Tadas", user.save();

    user.createdAt = new Date("2005-03-03"); //cia suveiks immutable ir 2005 neissaugos
    user.save(); //kad issaugotu ir duomenu bazej, o ne tik lokaliai

    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
}

// createUser(); // uzkomentuojam, kad nebespamintu useriu
