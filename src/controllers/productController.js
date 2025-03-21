import productUseCases from "../useCases/productUseCases.js";

const addProduct = async (req, res) => {
  try {
    const { productName, description, price, category, brand, addedBy } =
      req.body;

    if (
      !productName ||
      !description ||
      !price ||
      !category ||
      !brand ||
      !addedBy ||
      !req.files
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const productImages = req.files.map((file) => file.path);

    const newProduct = await productUseCases.addProductUseCase(
      productName,
      description,
      price,
      category,
      brand,
      productImages,
      addedBy
    );

    res.status(201).json({
      success: true,
      product: newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.body.userId;

    const updatedProduct = await productUseCases.updateProductUseCase(
      productId,
      userId,
      req.body
    );

    res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.body.userId;

    const response = await productUseCases.deleteProductUseCase(
      productId,
      userId
    );

    res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { brand, category, sortField, sortOrder } = req.query;
    const userId = req.user.id;

    const filters = { brand, category };
    const products = await productUseCases.getAllProductsUseCase(
      userId,
      filters,
      sortField,
      sortOrder
    );

    res
      .status(200)
      .json({
        success: true,
        products,
        message: "Fetched products successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await productUseCases.getUserProductsUseCase(userId);

    res
      .status(200)
      .json({
        success: true,
        products,
        message: "Fetched user's products successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
};
