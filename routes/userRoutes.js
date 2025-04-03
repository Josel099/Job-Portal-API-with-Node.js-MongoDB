const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser, suggestOpportunities } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/suggest-opportunities', suggestOpportunities);

module.exports = router;