import express from "express";
import { getAllPeople, addNewPerson } from "./controller.js";
const router = express.Router();

router.get("/", getAllPeople);

router.post("/", addNewPerson);

export default router;
