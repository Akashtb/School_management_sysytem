import express from "express";
import { Login, logOut, refreshToken, registerUser } from "../controllers/authController.js";
const router = express.Router();


router.post("/register",registerUser);
router.post("/login",Login);
router.post("/refreshToken",refreshToken);
router.post("/logOut",logOut);


export default router;
 