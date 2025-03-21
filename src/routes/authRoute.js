import express from "express";
import authController from "../controllers/authController.js";
import upload from "../services/multerService.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("profile-photo"),
  authController.register
);

router.post("/login", authController.login);

router.post("/refreshToken", authController.refreshToken);

export default router;
