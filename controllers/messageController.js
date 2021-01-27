const Message = require("../models/Message");

// <GET> all messages
exports.allMessages = async (req,res) => {
    try{
        const messages = await Message.find();
        res.json(messages);
    } catch(error) {
        res.send('Error : ' + error);
    }
}

// <POST> send  message
exports.sendMessage = async (req,res) => {
    const newMessage = new Message ({
        content: req.body.content,
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id
    })
    try {
        const message = await newMessage.save();
        res.json(message);
    } catch (error) {
        res.json(error);
    }
}

// <POST> all messages
exports.userMessage = async (req,res) => {
    try{
        const messages = await Message.find({$or:[{ sender_id: req.body.receiver_id, receiver_id: req.body.sender_id}, { sender_id: req.body.sender_id, receiver_id: req.body.receiver_id}]});
        res.json(messages);
    } catch(error) {
        res.send('Error : ' + error);
    }
}
