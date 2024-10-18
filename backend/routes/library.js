import express from 'express'
import { createLibraryRecord, deleteLibraryRecordOfAStudent, getAllLibraryRecordsOfAStudent, getLibraryRecordById, updateLibraryRecordOfAStudent } from '../controllers/libraryController.js'
const router = express.Router()
import { verifyAdmin, verifyLibrarian } from '../utils/verifyToken.js';


router.post('/createLibraryRecord/:studentId',verifyLibrarian,createLibraryRecord);
router.get('/getAllLibraryRecordsOfAStudent/:studentId',getAllLibraryRecordsOfAStudent);
router.get('/getLibraryRecordById',getLibraryRecordById);
router.put('/updateLibraryRecordOfAStudent/:id',verifyLibrarian,updateLibraryRecordOfAStudent);
router.delete('/deleteLibraryRecordOfAStudent/:id',verifyLibrarian,deleteLibraryRecordOfAStudent);



export default router