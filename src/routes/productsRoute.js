import express from "express";
import upload from "../services/multerService.js";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authRoutes.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  upload.array("productImages", 5),
  productController.addProduct
);
router.put("/:productId", authMiddleware, productController.updateProduct);
router.delete("/:productId", authMiddleware, productController.deleteProduct);
router.get("/", authMiddleware, productController.getAllProducts);
router.get("/my-products", authMiddleware, productController.getUserProducts);

export default router;
