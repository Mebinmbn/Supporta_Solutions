import express from "express";
import { config } from "dotenv";
import dbConnect from "./src/config/database.js";
import authRoutes from "./src/routes/authRoute.js";
config();
dbConnect();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use("/api/users", authRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
