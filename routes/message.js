const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// get all messages
router.get('/allMessages', messageController.allMessages);

// send message
router.post('/sendMessage', messageController.sendMessage);

// get all messages
router.post('/userMessage', messageController.userMessage);

module.exports = router;
