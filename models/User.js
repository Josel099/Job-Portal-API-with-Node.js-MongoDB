const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'plustwoStudent', 'collegeStudent'], default: 'plustwoStudent' }
});


module.exports = mongoose.model('User', UserSchema);