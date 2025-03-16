const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: String,
    company: String,
    description: String,
    location: String,
    salary: Number,
    experience: String,
    skills: [String],
    postDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);