import { createStudent, deleteStudent, getAllStudents, getStudentsById, updateStudent } from "../controllers/studentControllers.js";
import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();


router.post('/createStudent',verifyAdmin,createStudent);
router.get('/getAllStudents',getAllStudents);
router.get('/getSingleStudent/:id',verifyAdmin,getStudentsById);
router.put('/updateStudentDetail/:id',verifyAdmin,updateStudent);
router.delete('/deleteStudent/:id',verifyAdmin,deleteStudent);


export default router;