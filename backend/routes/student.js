import { createStudent, deleteStudent, getAllStudents, getStudentsById, updateStudent } from "../controllers/studentcontrollers";
import express from ("express");
import { verifyAdmin } from "../utils/verifyToken";


const router = express.Router();


router.post('/createStudent',verifyAdmin,createStudent);
router.get('/getAllStudents',verifyAdmin,getAllStudents);
router.get('/getSingleStudent',verifyAdmin,getStudentsById);
router.put('/updateStudentDetail',verifyAdmin,updateStudent);
router.delete('/deleteStudent',verifyAdmin,deleteStudent);


export default router;