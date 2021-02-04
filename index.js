const express = require('express');
const mongoose = require('mongoose');
const app = express();

// CORS 
const cors = require('./middlewares/cors');
app.use(cors)

// database
const url = 'mongodb://localhost/ChatApp';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const con = mongoose.connection;
con.on('open', () => {
    console.log('DB connected');
});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// API
// Auth
app.use ('/api', require('./routes/auth'));
// Messages
app.use ('/api', require('./routes/message'));

const server = app.listen(5000, () => console.log('Server started on port 5000'));

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

require('./socket')(io);
