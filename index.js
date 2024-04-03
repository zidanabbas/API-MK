import express from "express";
import "dotenv/config";
import prisma from "./prisma/index.js";
// import productsRoutes from "./routes/products.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(middlewareLogRequest);

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`express API running on PORT ${PORT}`);
});
