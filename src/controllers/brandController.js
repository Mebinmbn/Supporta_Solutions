import brandUseCases from "../useCases/brandUseCases";

const addBrand = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("license image is required");
    }

    const { brandName, categories } = req.body;
    if (!brandName || !req.file || !categories) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBrand = await brandUseCases.addBrandUseCase(
      brandName,
      req.file.path,
      categories
    );

    if (response) {
      res.status(201).json({
        success: true,
        brand: newBrand,
        message: "Brand added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await brandUseCases.findAllBrandUseCase();
    res.status(200).json({
      success: true,
      brands,
      message: "Fetched branches successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default { addBrand, getAllBrands };
