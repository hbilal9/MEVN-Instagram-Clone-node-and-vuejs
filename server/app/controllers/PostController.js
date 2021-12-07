const Post = require('../models/Post');

exports.createPost = (req, res) => {
    const {caption, img} = req.body;
    const post = new Post({
        caption,
        img,
        postedBy: req.profile
    });

    post.save().then(result => {
        return res.status(200).json({post: result})
    })
}

exports.getMyPosts = (req, res) => {
    Post.find({postedBy: req.profile._id}).populate('postedBy')
        .then(posts => {
            return res.status(200).json({data: posts});
        });
}

exports.fetchTimelinePosts = (req, res) => {
    Post.find().populate('postedBy', '_id display_photo username first_name last_name')
        .then(posts => {
            return res.status(200).json(posts);
        });
}
