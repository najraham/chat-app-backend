const Message = require('./models/Message')

module.exports = (io) => {
    io.sockets.on("connection", (socket) => {
        console.log(`${socket.id} user connected`);

        socket.on("loadUserMessage", async(data) => {
            const messages = await Message.find({$or:[{ sender_id: data.receiver_id, receiver_id: data.sender_id}, { sender_id: data.sender_id, receiver_id: data.receiver_id}]});
            socket.emit("setMessages", messages)
        });

        socket.on("sendMessage", async(data) => {
            const newMessage = new Message ({
                content: data.content,
                sender_id: data.sender_id,
                receiver_id: data.receiver_id
            })
            const message = await newMessage.save();
            socket.emit("messageSent", message)
        })
    });
};
