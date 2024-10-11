import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: { type: Date, required: true },
    qualification: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String }
    },
    class: { type: String, required: true },
    enrollmentDate: { type: Date, default: Date.now }, 
    guardianDetails: {
        name: { type: String, required: true },
        relationship: { type: String, required: true },
        contactNumber: { type: String, required: true },
        email: { type: String }
    }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
