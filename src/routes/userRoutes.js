import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authRoutes.js";

const router = express.Router();

router.post("./block", authMiddleware, userController.blockUser);

router.post("./unblock", authMiddleware, userController.unblockUser);

export default router;
