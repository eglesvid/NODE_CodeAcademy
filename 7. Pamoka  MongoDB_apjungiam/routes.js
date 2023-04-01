// routes.js norim nusirodyti visus routes ir nenorim, kad cia butu kazkokia logika, ja controllers.js apsirasom, ten visa business logic
// 1. connect to mongodb users database
// 2. create User schema and model
// 3. create endpoints:
//     1. GET all users
//     2. GET user by id
//     3. GET all users by name
//     4. POST add a new user
//     5. DELETE user by id
//     6. PUT update a user by id

import express from "express";
// import User from "./UserModel.js"; //sitam faile nebereikia sitos eilutes, nes nebenaudojam. User reikia susiimportuoti controllers.js
import {
  getAllUsers,
  getUserById,
  getAllUsersByName,
  createNewUser,
  deleteUserById,
  updateUserById,
} from "./controllers.js";

const router = express.Router();

router.get("/users", getAllUsers);
//vietoj async (req, res) => {
//   res.json({ endpoint: "GET all users" }); // sita vienintele eilute buvo pirmas dummy apsirasymo example
//   const users = await User.find();
//   res.json(users);

router.get("/users/:id", getUserById);
// async (req, res) => {
// res.json({ endpoint: "Get user by id" });
//   const { id } = req.params;
//   //   const user = await User.find({ _id: id}) arba galima lengviau:
//   const user = await User.findById(id);
//   res.json(user);

router.get("/users/name/:name", getAllUsersByName);
// async (req, res) => {
//     //   res.json({ endpoint: "Get users by name" });

//     const { name } = req.params; //is pradziu pasiimam ta name is parametru
//     const users = await User.find({ name }); // sutrumpinimas vietoj ({ name: name })
//     res.json(users);

router.post("/users", createNewUser);
// async (req, res) => {
//     //   res.json({ endpoint: "Post users" });

//     const { name, lastName, age } = req.body;
//     const user = {
//       name,
//       lastName,
//       age,
//     };
//     const userSaved = await User.create(user); // iskart sukuria ir issaugo // arba kitas budas:
//     // const userSave = new User(user);
//     // userSave.save();

//     res.json(userSaved);

router.delete("/users/:id", deleteUserById);
// // async (req, res) => {
//   //   res.json({ endpoint: "Delete user by id" });

//   const { id } = req.params;
//   const respDB = await User.findByIdAndDelete(id); //visur, kur kreipiames i DB, reik AWAIT!

//   res.json(respDB);

router.put("/users/:id", updateUserById);
// async (req, res) => {
//     //   res.json({ endpoint: "Update user by id" });

//     const { id } = req.params;
//     const { name, lastName, age } = req.body;

//     const user = await User.updateOne({ _id: id }, { name, lastName, age }); //findbyidandupdate praignoruos musu apribojimus, todel geriau nenaudoti jo

//     res.json(user);

export default router;
