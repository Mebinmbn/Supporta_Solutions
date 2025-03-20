import express from "express";

const router = express.Router();

router.post(
  "/products",
  upload.array("productImages", 5),
  productController.addProduct
);
router.put("/products/:productId", productController.updateProduct);
router.delete("/products/:productId", productController.deleteProduct);
router.get("/products", productController.getAllProducts);

export default router;
