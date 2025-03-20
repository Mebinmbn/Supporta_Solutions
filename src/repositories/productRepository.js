import { Product } from "../models/productModel";

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

export default { addProduct, existingProduct, updateProduct };
