import mongoose from 'mongoose';

const feesHistorySchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    feeType: { type: String, required: true }, 
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Cleared', 'Due']},
    remarks: { type: String }
}, { timestamps: true });

const FeesHistory = mongoose.model('FeesHistory', feesHistorySchema);
export default FeesHistory;
