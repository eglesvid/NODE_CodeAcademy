import express from "express";
import {
  getAllCategories,
  getAllProductsWithCategories,
  getCategoryValue,
} from "./controllers.js";
const router = express.Router();

router.get("/categories", getAllCategories);
router.get("/products", getAllProductsWithCategories);
router.get("/categoryvalue", getCategoryValue);

export default router;
