import Brand from "../models/brandModel.js";

const existingBrand = async (brandName) => {
  return await Brand.findOne({ brandName });
};

const addBrand = async (brandName, filePath, categories) => {
  const newBrand = new Brand({
    brandName,
    brandLogo: filePath,
    categories: Array.isArray(categories) ? categories : categories.split(","),
  });

  await newBrand.save();
  return newBrand;
};

const findAllBrands = async () => {
  try {
    return await Brand.find();
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw new Error(error.message || "Error in fetching brands");
  }
};

export default { existingBrand, addBrand, findAllBrands };
