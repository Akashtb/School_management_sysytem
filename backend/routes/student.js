import { createStudent, deleteStudent, getAllStudents, getRecentStudents, getStudentsById, updateStudent } from "../controllers/studentControllers.js";
import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { getCurrentUser } from "../controllers/authController.js";


const router = express.Router();


router.post('/createStudent',verifyAdmin,createStudent);
router.get('/getAllStudents',getAllStudents);
router.get('/getRecentStudents',getRecentStudents);
router.get('/getSingleStudent/:id',verifyAdmin,getStudentsById);
router.put('/updateStudentDetail/:id',verifyAdmin,updateStudent);
router.delete('/deleteStudent/:id',verifyAdmin,deleteStudent);


export default router;