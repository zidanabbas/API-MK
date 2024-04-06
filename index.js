import express from "express";
import "dotenv/config";
import middlewareLogRequest from "./middleware/log.js";
import projectRoutes from "./routes/products.js";
import prisma from "./prisma/index.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(middlewareLogRequest);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://nasigorengmk.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/v1", (req, res) => {
  res.send("Selamat datang di API Nasi Goreng MK!");
});

app.use("/v1", projectRoutes);

prisma
  .$connect()
  .then(() => {
    console.log("Connected to MongoDB");
    // Memulai server setelah koneksi berhasil didirikan
    app.listen(PORT, () => {
      console.log(`express API running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Keluar dari aplikasi jika koneksi gagal
  });
