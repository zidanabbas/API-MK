import express from "express";
import multer from "multer";
import {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

// setting multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

// middleware
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", upload.single("image"), createNewProduct);
router.get("/products/:productId", getProductById);
router.patch("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

export default router;
