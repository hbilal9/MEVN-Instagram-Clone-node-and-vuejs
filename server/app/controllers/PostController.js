const Post = require('../models/Post');

exports.createPost = (req, res) => {
    const {caption, img, captionBgColor, captionFontColor} = req.body;
    const post = new Post({
        caption,
        img,
        captionBgColor,
        captionFontColor,
        postedBy: req.profile
    });

    post.save().then(result => {
        return res.status(200).json(result)
    })
}

exports.getMyPosts = (req, res) => {
    Post.find({postedBy: req.profile._id}).populate('postedBy').sort('created_at', -1)
        .then(posts => {
            return res.status(200).json(posts);
        });
}

exports.fetchTimelinePosts = (req, res) => {
    Post.find().populate('postedBy', '_id display_photo username first_name last_name')
        .then(posts => {
            return res.status(200).json(posts);
        });
}
