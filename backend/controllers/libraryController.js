import LibraryHistory from '../models/Library.js';
import { createError } from '../utils/error.js';

export const createLibraryRecord = async (req, res, next) => {
    try {
        const { studentId } = req.params;

        const newLibraryRecord = new LibraryHistory({
            ...req.body, 
            studentId 
        });

        await newLibraryRecord.save();
        res.status(201).json({ message: "Library record created successfully", data: newLibraryRecord });
    } catch (error) {
        console.error('Error creating library record:', error);
        return next(createError(500, "Failed to create library record"));
    }
};

export const getAllLibraryRecordsOfAStudent = async (req, res, next) => {
    try {
        const { studentId } = req.params; 
        const filters = studentId ? { studentId } : {};
        const libraryRecords = await LibraryHistory.find(filters)
        res.status(200).json(libraryRecords);
    } catch (error) {
        console.error('Error fetching library records:', error);
        return next(createError(500, "Failed to fetch library records"));
    }
};

export const getLibraryRecordById = async (req, res, next) => {
    try {
        const recordId = req.params.id;
        const libraryRecord = await LibraryHistory.findById(recordId).populate('studentId', 'firstName lastName');
        if (!libraryRecord) {
            return next(createError(404, 'Library record not found'));
        }
        res.status(200).json(libraryRecord);
    } catch (error) {
        console.error('Error fetching library record:', error);
        return next(createError(500, "Failed to fetch library record"));
    }
};

export const updateLibraryRecordOfAStudent = async (req, res, next) => {
    try {
        const recordId = req.params.id;
        const updatedLibraryRecord = await LibraryHistory.findByIdAndUpdate(recordId, req.body, { new: true, runValidators: true });
        if (!updatedLibraryRecord) {
            return next(createError(404, 'Library record not found'));
        }
        res.status(200).json({ message: 'Library record updated successfully', data: updatedLibraryRecord });
    } catch (error) {
        console.error('Error updating library record:', error);
        return next(createError(500, "Failed to update library record"));
    }
};

export const deleteLibraryRecordOfAStudent = async (req, res, next) => {
    try {
        const recordId = req.params.id;
        const deletedLibraryRecord = await LibraryHistory.findByIdAndDelete(recordId);
        if (!deletedLibraryRecord) {
            return next(createError(404, 'Library record not found'));
        }
        res.status(200).json({ message: 'Library record deleted successfully' });
    } catch (error) {
        console.error('Error deleting library record:', error);
        return next(createError(500, "Failed to delete library record"));
    }
};
