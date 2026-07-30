import { Router } from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/authController.js";
import { authenticationMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authenticationMiddleware, getMe);

export default router;