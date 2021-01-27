const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// get users
router.get('/users', authController.users);

// login
router.post('/login', authController.login);

// register
router.post('/register', authController.register);

module.exports = router;
