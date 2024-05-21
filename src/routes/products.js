import express from "express";
import {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", createNewProduct);
router.get("/products/:productId", getProductById);
router.patch("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

export default router;
