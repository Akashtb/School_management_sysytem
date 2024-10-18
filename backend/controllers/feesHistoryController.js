import FeesHistory from "../models/FeesHistory.js";
import { createError } from "../utils/error.js";
export const createFeeRecord = async (req, res, next) => {
    const { studentId } = req.params; 

    try {
        const newFeeRecord = new FeesHistory({
            ...req.body, 
            studentId,   
        });
        const savedRecord = await newFeeRecord.save();
        res.status(201).json({
            message: 'Fee record created successfully.',
            record: savedRecord,
        });
    } catch (error) {
        console.error('Error creating fee record:', error);
        next({ status: 500, message: 'Failed to create fee record', error: error.message });
    }
};

export const getAllFeesRecordsOfAStudent = async (req, res, next) => {
    try {
        const { studentId } = req.params
        const filters = studentId ? { studentId } : {};
        const feesRecords = await FeesHistory.find(filters)
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