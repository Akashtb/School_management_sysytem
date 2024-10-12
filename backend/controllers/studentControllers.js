import Student from "../models/Student";
import { createError } from "../utils/error";

export const createStudent = async(req,res,next)=>{
    try {
        const newStudent = new Student(req.body);
        const feeDetails = [
            { feeType: 'First Term', amount: 1000 },
            { feeType: 'Second Term', amount: 1000 },
            { feeType: 'Third Term', amount: 1000 },
            { feeType: 'Exam Fee', amount: 500 },
        ];

        const feesEntries = feeDetails.map((fee) => ({
            ...fee,
            studentId: newStudent._id,
            status: 'Unpaid',
        }));

        await FeesHistory.insertMany(feesEntries);
        await newStudent.save();
        res.status(201).json({message:"Student created successfully",data:newStudent});
    } catch (error) {
        console.error('Error creating student:', error);
        return next(createError(500, "failed to create student"));
    }
}


export const getAllStudents = async(req,res,next)=>{
    try {
        const Allstudents = await Student.find();
        res.status(200).json(Allstudents);
    } catch (error) {
        console.error('Failed to fetch all students:', error);
        return next(createError(500, "Failed to fetch all students"));
    }
}


export const getStudentsById = async(req,res,next)=>{
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        if(!studentId){
            return next(createError(404,'Student not found'));
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        return next(createError(500, 'Failed to fetch student'));
    }
}


export const updateStudent = async(req,res,next)=>{
    try {
        const studentId = req.params.id;
        const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true, runValidators: true });
        if (!updatedStudent) {
            return next(createError(404,'Student not found'));
        }
        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Failed to update student' });
    }
}


export const deleteStudent = async(req,res,next)=>{
    try {
        const studentId = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        
        if (!deletedStudent) {
            return next(createError(404,'Student not found'));
        }

        await FeesHistory.deleteMany({ studentId });

        await LibraryHistory.deleteMany({ studentId });

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
}