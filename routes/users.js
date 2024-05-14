import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";

import {
  getAllUsers,
  createNewUsers,
  updateUsers,
  deleteUsers,
} from "../controllers/users.js";

const router = express.Router();

router.get("/users", authMiddleware, getAllUsers);
router.post("/users", authMiddleware, createNewUsers);
router.patch("/users/:userId", authMiddleware, updateUsers);
router.delete("/users/:userId", authMiddleware, deleteUsers);

export default router;
