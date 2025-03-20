import express from "express";
import { config } from "dotenv";
import dbConnect from "./src/config/database.js";
import authRoutes from "./src/routes/authRoute.js";
import brandRoutes from "./src/routes/brandRoute.js";
import productsRoutes from "./src/routes/productsRoute.js";
config();
dbConnect();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/products", productsRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
