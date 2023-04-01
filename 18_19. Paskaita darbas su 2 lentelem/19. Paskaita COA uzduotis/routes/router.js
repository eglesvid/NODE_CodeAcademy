import express from "express";
import {
  getAllProducts,
  getProductById,
  getOrderById,
  postNewProduct,
  postNewOrder,
  deleteProductById,
} from "../controllers/controller.js";
import { validatePassword } from "../middleware/validator.js";

const router = express.Router();

router.get("/products", getAllProducts);

//pagal paduodamą ID grąžins specifinį produktą iš duomenų bazės.
router.get("/products/:id", getProductById);

//pagal paduodamą ID grąžins specifinį užsakymą, tik šioje vietoje - paduos užsakymo id, kliento vardą, el paštą bei produkto pavadinimą, nuotrauką ir kainą (čia reikės naudoti SQL JOIN, kad apjungti lenteles grąžinant rezultatą).
router.get("/products/orders/:id", getOrderById);

router.post("/products", postNewProduct);

router.post("/products/orders/:id", postNewOrder);

router.delete("/products/:id", validatePassword, deleteProductById);

export default router;
