import express from "express";
import {
  getUserIdAndName,
  getUserIdAndNameAndEmail,
  getUserIdAndNameAndAddress,
  postUserIntoMongoDB,
  getAllUsersFromMongoDB,
} from "../controllers/controller.js";
import { validatePost } from "../middleware/validator.js";
const router = express.Router();

//GET - /api/users/names - masyvą su vartotojais, kurie bus objekte ir jame bus matomas vartotojo id ir vardas
router.get("/api/users/names", getUserIdAndName);

//GET - /api/users/emails - masyvą su vartotojais, kurie bus objekte ir jame bus matomas vartotojo id, vardas ir email
router.get("/api/users/emails", getUserIdAndNameAndEmail);

//GET - /api/users/address - masyvą su vartotojais, kurie bus objekte ir jame bus matomas vartotojo id, vardas ir pilnas adresas (gatvė ir miestas kaip vienas string)
router.get("/api/users/address", getUserIdAndNameAndAddress);

router.post("/api/users", validatePost, postUserIntoMongoDB);

router.get("/api/users", getAllUsersFromMongoDB);

export default router;
