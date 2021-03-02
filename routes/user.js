const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// get users
router.get('/users', userController.users);

module.exports = router;