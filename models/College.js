const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: String,
    location: String,
    courses: [String]
});

module.exports = mongoose.model('College', CollegeSchema);