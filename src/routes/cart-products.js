import express from "express";
import {
  getAllCartProducts,
  createNewCartProduct,
} from "../controllers/cart-products.js";

const router = express.Router();

router.get("/carts", getAllCartProducts);
router.post("/carts", createNewCartProduct);

export default router;
