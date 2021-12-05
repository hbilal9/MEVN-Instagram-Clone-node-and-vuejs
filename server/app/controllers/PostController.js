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
        return res.status(200).json({post: result})
    })
}

exports.getMyPosts = (req, res) => {
    Post.find({postedBy: req.profile._id}).populate('postedBy')
        .then(posts => {
            return res.status(200).json({data: posts});
        });
}
