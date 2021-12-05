const User = require('../models/User');

exports.getUserById = (req, res) => {
    User.findById({_id: req.body.id})
    .then(user => {
        if(!user){
            res.status(403).json({message: "No user found with the id."});
        }
        res.status(200).json(user);
    });
}

exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        });
}