const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');

const app = express();

// CORS 
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

// Auth
app.use ('/api', require('./routes/auth'));

// Messages
app.use ('/api', require('./routes/message'));

app.listen(5000, () => console.log('Server started on port 5000'));