const User = require('../models/User');

// <GET> get all users
exports.users = async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch(error) {
        res.send('Error : ' + error);
    }
}

// <POST> login
exports.login = async (req, res) => {
    const loginDetail = {
        email: req.body.email,
        password: req.body.password
    }
    try{
        if(!loginDetail.email || !loginDetail.password){
            return res.status(400).json({ msg: "Please include both email and password." });
        }
        else {
            const user = await User.findOne({email: loginDetail.email});
            
            if(user) {
                if(user.password == loginDetail.password) {
                    res.json(user)
                }
                else{
                    res.status(400).json({ msg: "Incorrect credentials." });
                }
            }
        }
    } catch (error) {
        res.send('Error : ' + error);
    }
};

// <POST> register
exports.register = async (req,res) =>{
    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const user = await newUser.save();
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};