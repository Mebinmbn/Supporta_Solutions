import brandRepository from "../repositories/brandRepository.js";
import productRepository from "../repositories/productRepository.js";

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

  return await productRepository.deleteProduct();
};

const getAllProductsUseCase = async (userId, filters, sortField, sortOrder) => {
  const blockedUsers = await UserModel.find({ blockedUsers: userId }).select(
    "_id"
  );
  const blockedUserIds = blockedUsers.map((user) => user._id);

  let query = { addedBy: { $nin: blockedUserIds } };
  if (filters.brand) query.brand = filters.brand;
  if (filters.category) query.category = filters.category;

  let sortQuery = {};
  if (sortField) sortQuery[sortField] = sortOrder === "desc" ? -1 : 1;

  return await productRepository.findProducts(query, sortQuery);
};

const getUserProductsUseCase = async (userId) => {
  return await productRepository.findUserProducts(userId);
};

export default {
  addProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  getAllProductsUseCase,
  getUserProductsUseCase,
};
