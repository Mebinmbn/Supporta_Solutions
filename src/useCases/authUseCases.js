import authRepository from "../repositories/authRepository.js";
import { comparePassword, hashPassword } from "../services/bcrypt.js";
import {
  generateRefreshToken,
  generateToken,
} from "../services/tokenService.js";

const registerUseCase = async (userData) => {
  try {
    const isExistingUser = await authRepository.isExistingUser(userData.email);
    if (isExistingUser) {
      throw new Error("Email already registered, please login");
    }

    userData.password = await hashPassword(userData.password);
    console.log("Hashed password:", userData.password);

    return await authRepository.registerUser(userData);
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw new Error(error.message || "Error in registration");
  }
};

const loginUseCase = async (email, password) => {
  try {
    const user = await authRepository.isExistingUser(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credintials");
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    return { token, refreshToken, user };
  } catch (error) {
    console.error("Login Error:", error.message);
    throw new Error(error.message || "Error in login");
  }
};

export default { registerUseCase, loginUseCase };
