import express from "express";
import upload from "../services/multerService.js";
import productController from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/add",
  upload.array("productImages", 5),
  productController.addProduct
);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);
router.get("/get", productController.getAllProducts);
router.get("/my-products", productController.getUserProducts);

export default router;
