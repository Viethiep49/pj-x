import express from "express";
import { login, register, me, googleLogin } from "../../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", me);
router.post("/google-login", googleLogin);

export default router;
