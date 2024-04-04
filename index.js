import express from "express";
import "dotenv/config";
import middlewareLogRequest from "./middleware/log.js";
import projectRoutes from "./routes/products.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(middlewareLogRequest);

app.get("/v1", (req, res) => {
  res.send("Selamat datang di API Nasi Goreng MK!");
});

app.use("/v1", projectRoutes);

app.listen(PORT, () => {
  console.log(`express API running on PORT ${PORT}`);
});
