import express from "express";
import "dotenv/config";
import prisma from "./prisma/index.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import middlewareLogRequest from "./src/middleware/log.js";
import productRoutes from "./src/routes/products.js";
import usersRoutes from "./src/routes/users.js";
import userServices from "./src/routes/auth.js";
import cartProducts from "./src/routes/cart-products.js";

const app = express();
const PORT = process.env.PORT;

//definisi paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//setting multer
const fileStorage = multer.diskStorage({
  // menyimpan file di folder images
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  // membuat nama file berdasarkan waktu
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

// membuat logic untuk mengecek file type
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

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

app.use(express.json());
app.use(middlewareLogRequest);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://nasigorengmk.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Selamat datang di API Nasi Goreng MK!</h1>");
});
app.get("/images/:imageName", (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, "images", imageName);
  res.sendFile(imagePath);
});
app.use("/v1", productRoutes);
app.use("/v1", userServices);
app.use("/v1", usersRoutes);
app.use("/v1", cartProducts);

prisma
  .$connect()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`express API running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
