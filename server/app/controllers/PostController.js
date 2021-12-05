const Post = require('../models/Post');

exports.createPost = (req, res) => {
    const {title, body, img} = req.body;
    const post = new Post({
        title,
        body,
        img,
        postedBy: req.profile
    });

    post.save().then(result => {
        res.status(200).json({post: result})
    })
}

exports.getMyPosts = (req, res) => {
    Post.findById({postedBy: req.profile._id})
        .then(posts => {
            res.status(200).json(posts);
        });
}