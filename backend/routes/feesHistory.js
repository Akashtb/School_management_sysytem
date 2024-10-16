import express from 'express';
import { deleteFeesRecordOfAStudents, getAllFeesRecordsOfAStudent, getFeesRecordById, updateFeesRecordOfAStudent } from '../controllers/feesHistoryController.js';
const router = express.Router();


router.get('/getAllFeesRecordsOfAStudent',getAllFeesRecordsOfAStudent);
router.get('/getFeesRecordById',getFeesRecordById);
router.put('/updateFeesRecordOfAStudent',updateFeesRecordOfAStudent);
router.delete('/deleteFeesRecordOfAStudents',deleteFeesRecordOfAStudents);


export default router