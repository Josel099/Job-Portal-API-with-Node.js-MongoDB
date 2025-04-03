const express = require('express');
const { createJob, getJobs, updateJob, deleteJob,getJobById, searchJobs } = require('../controllers/jobController');
const router = express.Router();

router.post('/', createJob);
router.get('/', getJobs);
router.get('/search',searchJobs)
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);


module.exports = router;