import express from "express";
import brandController from "../controllers/brandController.js";
import upload from "../services/multerService.js";
import authMiddleware from "../middlewares/authRoutes.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  upload.single("brandLogo"),
  brandController.addBrand
);

router.get("/get", authMiddleware, brandController.getAllBrands);

export default router;
