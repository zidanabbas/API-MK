import express from "express";

import {
  getAllUsers,
  createNewUsers,
  updateUsers,
  deleteUsers,
} from "../controllers/users.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", createNewUsers);
router.patch("/users/:userId", updateUsers);
router.delete("/users/:userId", deleteUsers);

export default router;
