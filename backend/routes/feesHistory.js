import express from 'express';
import { createFeeRecord, deleteFeesRecordOfAStudents, getAllFeesRecordsOfAStudent, getFeesRecordById, updateFeesRecordOfAStudent } from '../controllers/feesHistoryController.js';
import { verifyAdmin, verifyOfficeStaff } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/createFeeOfAstudent/:studentId',verifyOfficeStaff,createFeeRecord)
router.get('/getAllFeesRecordsOfAStudent/:studentId',getAllFeesRecordsOfAStudent);
router.get('/getFeesRecordById',getFeesRecordById);
router.put('/updateFeesRecordOfAStudent/:id',verifyOfficeStaff,updateFeesRecordOfAStudent);
router.delete('/deleteFeesRecordOfAStudents/:id',verifyOfficeStaff,deleteFeesRecordOfAStudents);


export default router