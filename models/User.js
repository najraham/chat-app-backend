const mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "is already taken"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// userSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('User', userSchema);