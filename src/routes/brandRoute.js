import express from "express";
import brandController from "../controllers/brandController.js";
import upload from "../services/multerService.js";

const router = express.Router();

router.post("/add", upload.single("brandLogo"), brandController.addBrand);

router.get("/get", brandController.getAllBrands);

export default router;
