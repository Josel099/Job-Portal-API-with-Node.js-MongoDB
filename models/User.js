const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'plustwoStudent', 'collegeStudent'], default: 'plustwoStudent' },
    // College student fields
    degree: String,
    course: String,
    marks: Number,
    age: Number,
    // Plus two student fields
    plusTwoPercentage: Number,
    plusTwoStream: String
});

module.exports = mongoose.model('User', UserSchema);