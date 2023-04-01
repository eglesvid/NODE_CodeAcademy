import express from "express";
import {
  getAllProducts,
  createNewProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  routeNotFound,
  getProductsPaginate,
} from "../controllers/controller.js";
import {
  middlewareTest,
  checkIfAuthenticated,
} from "../middleware/middleware.js";

const router = express.Router();

router.get("/products/pagination", middlewareTest, getProductsPaginate);

// Pasiimam visus produktus
router.get("/products", getAllProducts);

// Pasiimam viena produkta pagal ID
router.get("/products/:id", getProductById);

// Sukursim nauja produkta
router.post("/products", checkIfAuthenticated, createNewProduct);

// Atnaujinsim viena produkta pagal ID
router.put("/products/:id", checkIfAuthenticated, updateProductById);

// Istrinam viena produkta pagal ID
router.delete("/products/:id", checkIfAuthenticated, deleteProductById);

// Jeigu kazka neteisingai irasom i savo thunderclient, tai mes galim pasidaryt, kad pagautu visus requestus ir jeigu tas requestas neatitinka nei vieno is musu aprasytu requestu, tada ismeta, kad tokio route ner
// all atitinka principe visus situs html metodus
// jis apacioj dedam (tikrina nuo virsaus i apacia). Apatinis pagaus viska
router.all("*", routeNotFound);

export default router;
