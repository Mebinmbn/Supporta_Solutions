import authUseCases from "../useCases/authUseCases.js";

const register = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const response = await authUseCases.registerUseCase(userData);
    if (response) {
      res.status(200).json({
        success: "true",
        response,
        message: "User registered successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { register };
