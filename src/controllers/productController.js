const productUseCases = require("../useCases/productUseCases");

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
    const products = await productUseCases.findAllProductUseCase();
    res.status(200).json({
      success: true,
      products,
      message: "Fetched products successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, updateProduct, deleteProduct, getAllProducts };
