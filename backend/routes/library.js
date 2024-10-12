import express from 'express'
import { createLibraryRecord, deleteLibraryRecordOfAStudent, getAllLibraryRecordsOfAStudent, getLibraryRecordById, updateLibraryRecordOfAStudent } from '../controllers/libraryController'
const router = express.Router()



router.post('/createLibraryRecord',createLibraryRecord);
router.get('/getAllLibraryRecordsOfAStudent',getAllLibraryRecordsOfAStudent);
router.get('/getLibraryRecordById',getLibraryRecordById);
router.put('/updateLibraryRecordOfAStudent',updateLibraryRecordOfAStudent);
router.delete('/deleteLibraryRecordOfAStudent',deleteLibraryRecordOfAStudent);



export default router