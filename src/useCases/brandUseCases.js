import brandRepository from "../repositories/brandRepository.js";

const addBrandUseCase = async (brandName, filePath, categories) => {
  try {
    const exitstingBrand = await brandRepository.existingBrand(brandName);
    if (exitstingBrand) {
      throw new Error("Brand already exists");
    }

    return await brandRepository.addBrand(brandName, filePath, categories);
  } catch (error) {
    console.error("Adding Error:", error.message);
    throw new Error(error.message || "Error in adding brands");
  }
};

const findAllBrandUseCase = async () => {
  try {
    return await brandRepository.findAllBrands();
  } catch (error) {
    console.error("Fetching Error:", error.message);
    throw new Error(error.message || "Error in fetching brands");
  }
};

export default { addBrandUseCase, findAllBrandUseCase };
