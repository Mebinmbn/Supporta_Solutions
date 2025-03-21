import { Product } from "../models/productModel.js";

const addProduct = async (
  productName,
  description,
  price,
  category,
  brand,
  productImages,
  addedBy
) => {
  try {
    const newProduct = await Product.create({
      productName,
      description,
      price,
      category,
      brand,
      productImages,
      addedBy,
    });

    return newProduct;
  } catch (error) {}
};

const existingProduct = async (productId) => {
  try {
    return await ProductModel.findById(productId);
  } catch (error) {}
};

const updateProduct = async (product, updates) => {
  try {
    Object.assign(product, updates);
    await product.save();
    return product;
  } catch (error) {}
};

const deleteProduct = async (productId) => {
  try {
    return await Product.deleteOne({ productId });
  } catch (error) {}
};

const findProducts = async (filters, sortQuery) => {
  return await Product.find(filters).sort(sortQuery);
};

const findUserProducts = async (userId) => {
  return await Product.find({ addedBy: userId });
};

export default {
  addProduct,
  existingProduct,
  updateProduct,
  deleteProduct,
  findProducts,
  findUserProducts,
};
