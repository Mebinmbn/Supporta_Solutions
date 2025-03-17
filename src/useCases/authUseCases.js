import authRepository from "../repositories/authRepository.js";
import { hashPassword } from "../services/bcrypt.js";

const registerUseCase = async (userData) => {
  try {
    // Ensure isExistingUser is awaited
    const isExistingUser = await authRepository.isExistingUser(userData.email);
    if (isExistingUser) {
      throw new Error("Email already registered, please login");
    }

    // Hash password
    userData.password = await hashPassword(userData.password);
    console.log("Hashed password:", userData.password);

    // Register user
    return await authRepository.registerUser(userData);
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw new Error(error.message || "Error in registration");
  }
};

export default { registerUseCase };
