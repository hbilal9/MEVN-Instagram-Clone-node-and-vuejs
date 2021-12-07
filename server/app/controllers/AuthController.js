const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(403).json({message: "Invalid email or password!"});
            }
            bcrypt.compare(password, user.password)
                .then(matched => {
                    if(!matched){
                        return res.status(403).json({message: "Invalid email or password!"});
                    }
                    req.profile = user;
                    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_KEY);
                    user.password = undefined;
                    user.__v = undefined;
                    return res.status(200).json({
                        user,
                        token
                    })
                });
        })
}

exports.register = (req, res) => {
    const {username, first_name, last_name, email, password} = req.body
    User.findOne({email})
        .then(exists => {
            if(exists){
                res.status(422).json({error: 'Email already taken.'});
            }else{
                bcrypt.hash(password, 15).then(hash => {
                    const user = new User({
                        username,
                        first_name,
                        last_name,
                        email,
                        password: hash
                    });
                    user.save().then(result => {
                        res.json({message: "Successfully registered."})
                    })
                })
            }
        }
    );
}

exports.getProfile = (req, res) => {
    res.json(req.profile);
}