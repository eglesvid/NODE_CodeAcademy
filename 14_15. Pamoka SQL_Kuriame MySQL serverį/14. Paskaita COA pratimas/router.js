import express from "express";
import {
  getServer,
  getShirts,
  createShirt,
  routeNotFound,
} from "./controller.js";
const router = express.Router();

// Serveris veikia
router.get("/", getServer);

// Pasiimam 10 marskineliu
router.get("/shirts/:size", getShirts);

// Irasom vienus marskinelius
router.post("/shirts", createShirt);

// Ismeta, kad tokio puslapio nera
router.all("*", routeNotFound);

export default router;
