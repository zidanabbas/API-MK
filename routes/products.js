import { Router } from "express";
import { getAllProducts } from "../controllers/products.js";

const router = Router();

router.get("/products", getAllProducts);
// router.post("/products", createNewProduct);

export default router;
