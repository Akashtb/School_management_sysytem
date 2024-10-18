import express from "express";
import { deleteUser, getAllUserExceptCurrentUser, getCurrentUser, getRecentUser, getUserById, Login, logOut, refreshToken, registerUser, updateCurrentUserDetails, updateUserDetails } from "../controllers/authController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";
const router = express.Router();


router.post("/createNewUser",verifyAdmin,registerUser);
router.post("/login",Login);
router.get("/getAllUserExceptCurrentUser", verifyToken, getAllUserExceptCurrentUser)
router.get("/getUserById/:id",getUserById);
router.get("/getRecentUser",getRecentUser);
router.get("/getCurrentUser",verifyToken,getCurrentUser)
router.put("/updateUser/:id", verifyAdmin, updateUserDetails);
router.put("/updateCurrentUser",verifyToken,updateCurrentUserDetails);
router.delete("/deleteUser/:id", verifyAdmin, deleteUser);
router.post("/refreshToken",refreshToken);
router.post("/logOut",logOut);


export default router;
 