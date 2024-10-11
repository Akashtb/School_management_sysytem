import mongoose from 'mongoose';

const libraryHistorySchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    bookName: { type: String, required: true },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: { type: String, enum: ['Borrowed', 'Returned'], default: 'Borrowed' }
}, { timestamps: true });

const LibraryHistory = mongoose.model('LibraryHistory', libraryHistorySchema);

export default LibraryHistory;
