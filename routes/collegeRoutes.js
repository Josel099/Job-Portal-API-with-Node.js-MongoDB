const express = require('express');
const { createCollege, getColleges, getCollegeById, updateCollege, deleteCollege, searchColleges } = require('../controllers/collegeController');
const router = express.Router();

router.post('/', createCollege);
router.get('/', getColleges);
router.get('/search', searchColleges);
router.get('/:id', getCollegeById);
router.put('/:id', updateCollege);
router.delete('/:id', deleteCollege);

module.exports = router;