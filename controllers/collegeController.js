const College = require('../models/College');

exports.createCollege = async (req, res) => {
    try {
        const college = new College(req.body);
        await college.save();
        res.status(201).json(college);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getColleges = async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) return res.status(404).json({ message: 'College not found' });
        res.json(college);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!college) return res.status(404).json({ message: 'College not found' });
        res.json(college);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) return res.status(404).json({ message: 'College not found' });
        res.json({ message: 'College deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};