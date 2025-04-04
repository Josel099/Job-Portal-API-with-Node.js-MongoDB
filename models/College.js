const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: String,
    location: String,
    mail: String,
    minMarks: Number,  // Minimum marks required
    courses: [String],
    requiredStream: [String],  // Required streams
});

module.exports = mongoose.model('College', CollegeSchema);