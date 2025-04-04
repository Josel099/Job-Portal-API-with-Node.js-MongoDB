const User = require('../models/User');
const Job = require('../models/Job');
const College = require('../models/College');
const exportDataToCSV = require('../mlModel/model');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Suggest Jobs for College Students & Colleges for Plus-Two Students
exports.suggestOpportunities = async (req, res) => {
  try {
    exportDataToCSV(); 
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "User not found" });

    let opportunities = [];

    if (user.role === "collegeStudent") {
      // Fetch Jobs Matching College Student's Qualification
      opportunities = await Job.find({
        requiredDegree: user.degree, 
        minMarks: { $lte: user.marks },  // ✅ Fixed field name
        requiredCourse: { $in: [user.course] } // ✅ Fixed for array matching
      });

      return res.json({ suggestedJobs: opportunities });

    } else if (user.role === "plustwoStudent") {
      // Fetch Colleges Matching Plus-Two Student's Percentage & Stream
      opportunities = await College.find({
        minMarks: { $lte: user.plusTwoPercentage }, // ✅ Fixed field name
        requiredStream: { $in: [user.plusTwoStream] }  // ✅ Fixed stream matching
      });

      return res.json({ suggestedColleges: opportunities });
    }

    res.status(400).json({ error: "Invalid user role" });
  } catch (err) { 
    console.error("Opportunity Suggestion Error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};