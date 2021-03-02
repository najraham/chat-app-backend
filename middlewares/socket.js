const Message = require('../models/Message');
const jwt = require('jsonwebtoken');

function validate(token) {
    var returnValue;
    jwt.verify(token, 'chatapp', function(err, decoded) {
        if (err){
            console.log('Authentication error')
            returnValue = 0
        }
        else{
            returnValue = decoded
        }   
    });

    return returnValue
    
}

module.exports = (io) => {
    io.sockets.on("connection", (socket) => {
        console.log(`${socket.id} user connected`);

        socket.on("loadUserMessage", async(data) => {
            if(data.token) {
                var decoded = validate(data.token)
                socket.decoded = decoded
            }
            else {
                console.log('Authentication error')
            }
            if(socket.decoded) {
                const messages = await Message.find({$or:[{ sender_id: data.receiver_id, receiver_id: data.sender_id}, { sender_id: data.sender_id, receiver_id: data.receiver_id}]});
                socket.emit("setMessages", messages)
            }
        });

        socket.on("sendMessage", async(data) => {
            if(data.token) {
                var decoded = validate(data.token)
                socket.decoded = decoded
            }
            else {
                console.log('Authentication error')
            }
            if(socket.decoded) {
                const newMessage = new Message ({
                    content: data.message.content,
                    sender_id: data.message.sender_id,
                    receiver_id: data.message.receiver_id
                })
                const message = await newMessage.save();
                socket.emit("messageSent", message)
            }
        });
    });
};
