import express from "express";
import {
  createNewCustomer,
  getAllCustomers,
} from "../controllers/customerController.js";
import {
  createNewOrder,
  getAllCustomersOrderById,
  addOrdersBulk,
} from "../controllers/orderController.js";
import {
  validateId,
  validateOrderBody,
  validateCustomerBody,
  validateOrderBodyBulk,
} from "../middleware/validators.js";
const router = express.Router();

router.post("/customer", validateCustomerBody, createNewCustomer);
router.post(
  "/customer/:id/order",
  validateId,
  validateOrderBody,
  createNewOrder
);
router.get("/customer/:id/order", validateId, getAllCustomersOrderById);
router.get("/customer", getAllCustomers);
router.post(
  "/customer/:id/order/bulk",
  validateId,
  validateOrderBodyBulk,
  addOrdersBulk
);

export default router;
