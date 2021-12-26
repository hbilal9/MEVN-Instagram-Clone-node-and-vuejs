const User = require('../models/User');
const Post = require('../models/Post');

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

exports.getUserByUsername = (req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            user.password = undefined;
            user.__v = undefined;
            res.status(200).json(user);
        })
}

exports.getPostByUsername = (req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            Post.find({postedBy: user._id}).populate('postedBy')
            .then(posts => {
                return res.status(200).json(posts);
            });
        })
}

exports.followUser = (req, res) => {
    User.findByIdAndUpdate(req.body._id, {
        $push: {followers: req.profile._id}
    })
        .then(updated => {
            User.findByIdAndUpdate(req.profile._id, {
                $push: {following: req.body._id}
            })
            .then(result => {
                res.json(updated)
            })
        })
}

exports.unFollowUser = (req, res) => {
    User.findByIdAndUpdate(req.body._id, {
        $pull: {followers: req.profile._id}
    })
        .then(updated => {
            User.findByIdAndUpdate(req.profile._id, {
                $pull: {following: req.body._id}
            })
            .then(result => {
                res.json(updated)
            })
        })
}