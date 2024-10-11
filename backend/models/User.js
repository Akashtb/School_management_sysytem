import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    qualification: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Office Staff', 'Librarian'], required: true }
},
    { timestamp: true }
);

const User = mongoose.model('User', userSchema);
export default User

