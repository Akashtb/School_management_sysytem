import { createStudent, deleteStudent, getAllStudents, getStudentsById, updateStudent } from "../controllers/studentControllers.js";
import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();


router.post('/createStudent',createStudent);
router.get('/getAllStudents',verifyAdmin,getAllStudents);
router.get('/getSingleStudent',verifyAdmin,getStudentsById);
router.put('/updateStudentDetail',verifyAdmin,updateStudent);
router.delete('/deleteStudent',verifyAdmin,deleteStudent);


export default router;