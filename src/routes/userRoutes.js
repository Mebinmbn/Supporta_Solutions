import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("./block", userController.blockUser);

router.post("./unblock", userController.unblockUser);

export default router;
