import express from "express";
import { getAllCars, createNewCar, deleteCarById, getCarById } from "../controllers/controller.js";
import { validateId, validateCarBody } from "../middleware/validators.js";
const router = express.Router();

// Get all cars in database
router.get("/cars", getAllCars);

// Get one car by ID
router.get("/cars/:id", validateId, getCarById);

// Create a new car
router.post("/cars", validateCarBody, createNewCar);

// Delete a car from database by id
router.delete("/cars/:id", validateId, deleteCarById);

export default router;
