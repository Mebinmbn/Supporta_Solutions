import express from "express";
import brandController from "../controllers/brandController";
import { upload } from "../services/multerService";

const router = express.Router();

router.post("/add", upload.single("brandLogo"), brandController.addBrand);

router.get("/get", brandController.getAllBrands);

export default router;
