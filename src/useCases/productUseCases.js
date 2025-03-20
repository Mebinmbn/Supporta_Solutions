const ProductModel = require("../models/productModel");

const { default: brandRepository } = require("../repositories/brandRepository");
const {
  default: productRepository,
} = require("../repositories/productRepository");

const addProductUseCase = async (
  productName,
  description,
  price,
  category,
  brand,
  productImages,
  addedBy
) => {
  const existingBrand = await brandRepository.existingBrand(brand);
  if (!existingBrand) {
    throw new Error("Brand does not exist.");
  }

  if (!existingBrand.categories.includes(category)) {
    throw new Error(
      `Category '${category}' is not available under '${brand}'.`
    );
  }

  return await productRepository.addProduct(
    productName,
    description,
    price,
    category,
    brand,
    productImages,
    addedBy
  );
};

const updateProductUseCase = async (productId, userId, updates) => {
  const product = await productRepository.existingProduct(productId);
  if (!product) {
    throw new Error("Product deosnot exists");
  }
  if (product.addedBy.toString() !== userId) {
    throw new Error("Unauthorized: You can only edit your own products.");
  }

  return await productRepository.updateProduct(product, updates);
};

const deleteProductUseCase = async (productId, userId) => {
  const product = await productRepository.existingProduct(productId);
  if (!product) {
    throw new Error("Product not found.");
  }

  if (product.addedBy.toString() !== userId) {
    throw new Error("Unauthorized: You can only delete your own products.");
  }

  await product.deleteOne();
  return { message: "Product deleted successfully" };
};

const findAllProductUseCase = async () => {
  return await ProductModel.find();
};

module.exports = {
  addProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  findAllProductUseCase,
};
