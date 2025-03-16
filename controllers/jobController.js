const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json({message:'Job created successfully',job});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getJobs = async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
};

exports.updateJob = async (req, res) => {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
};

exports.deleteJob = async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
};

exports.getJobById = async (req, res) => {
    const job = await Job.findById(req.params.id);
    res
        .status(200)
        .json(job);
}