const User = require('../models/User');

// <GET> get all users
exports.users = async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(error) {
        res.send('Error : ' + error);
    }
};