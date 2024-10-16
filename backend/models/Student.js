import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: { type: Date, required: true },
    address: { type: String },
    class: { type: String, required: true },
    enrollmentDate: { type: Date, default: Date.now },
    guardianName: { type: String, required: true },
    guardianRelationship: { type: String, required: true },
    guardianContactNumber: { type: String, required: true },
    guardianEmail: { type: String }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
