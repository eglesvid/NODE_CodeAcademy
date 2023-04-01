// GET /memberships
// POST /memberships
// DELETE /memberships/:id
// GET /users/:order
// POST /users/

import express from "express";
import {
  getAllMemberships,
  createMembership,
  deleteMembership,
  createUser,
} from "./controllers.js";

const router = express.Router();

router.get("/memberships", getAllMemberships);
router.post("/memberships", createMembership);
router.delete("/memberships/:id", deleteMembership);
// router.get("/users/:order", getUsersOrder);
router.post("/users", createUser);

export default router;
