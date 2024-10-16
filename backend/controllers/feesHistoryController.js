import FeesHistory from "../models/FeesHistory.js";
import { createError } from "../utils/error.js";


export const getAllFeesRecordsOfAStudent = async (req, res, next) => {
    try {
        const { studentId } = req.query; 
        const filters = studentId ? { studentId } : {};
        const feesRecords = await FeesHistory.find(filters).populate('studentId', 'firstName lastName');
        res.status(200).json(feesRecords);
    } catch (error) {
        console.error('Error fetching fees records:', error);
        return next(createError(500, "Failed to fetch fees records"));
    }
};

export const getFeesRecordById = async (req, res, next) => {
    try {
        const feesId = req.params.id;
        const feesRecord = await FeesHistory.findById(feesId).populate('studentId', 'firstName lastName');
        if (!feesRecord) {
            return next(createError(404, 'Fees record not found'));
        }
        res.status(200).json(feesRecord);
    } catch (error) {
        console.error('Error fetching fees record:', error);
        return next(createError(500, "Failed to fetch fees record"));
    }
};


export const updateFeesRecordOfAStudent = async (req, res, next) => {
    try {
        const feesId = req.params.id;
        const updatedFeesRecord = await FeesHistory.findByIdAndUpdate(feesId, req.body, { new: true, runValidators: true });
        if (!updatedFeesRecord) {
            return next(createError(404, 'Fees record not found'));
        }
        res.status(200).json({ message: 'Fees record updated successfully', data: updatedFeesRecord });
    } catch (error) {
        console.error('Error updating fees record:', error);
        return next(createError(500, "Failed to update fees record"));
    }
};


export const deleteFeesRecordOfAStudents = async (req, res, next) => {
    try {
        const feesId = req.params.id;
        const deletedFeesRecord = await FeesHistory.findByIdAndDelete(feesId);
        if (!deletedFeesRecord) {
            return next(createError(404, 'Fees record not found'));
        }
        res.status(200).json({ message: 'Fees record deleted successfully' });
    } catch (error) {
        console.error('Error deleting fees record:', error);
        return next(createError(500, "Failed to delete fees record"));
    }
};