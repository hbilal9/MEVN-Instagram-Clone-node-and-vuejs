const Post = require('../models/Post');

exports.createPost = (req, res) => {
    const {caption, img, captionBgColor, captionFontColor, captionFontFamily} = req.body;
    const post = new Post({
        caption,
        img,
        captionBgColor,
        captionFontColor,
        captionFontFamily,
        postedBy: req.profile
    });

    post.save().then(result => {
        return res.status(200).json(result)
    })
}

exports.getMyPosts = (req, res) => {
    Post.find({postedBy: req.profile._id}).populate('postedBy')
        .then(posts => {
            return res.status(200).json(posts);
        });
}

exports.fetchTimelinePosts = (req, res) => {
    // Post.find().populate('postedBy', '_id display_photo username first_name last_name')
    //     .populate('comments.commentBy', '_id username')
    //     .sort({updated_at : -1})
    //     .then(posts => {
    //         return res.status(200).json(posts);
    //     });
    Post.find({postedBy: {$in: [req.profile.following, req.profile._id]}}).populate('postedBy', '_id display_photo username first_name last_name')
        .populate('comments.commentBy', '_id username')
        .sort({updated_at : -1})
        .then(posts => {
            return res.status(200).json(posts);
        });
}


exports.likePost = (req, res) => {
    Post.findByIdAndUpdate(req.body.post_id, {
        $push: {likes: req.profile._id}
    }, {
        new: true
    }).exec((error, result) => {
        if(error) res.status.json(error);
        res.status(200).json(result)
    });
}

exports.unlikePost = (req, res) => {
    Post.findByIdAndUpdate(req.body.post_id, {
        $pull: {likes: req.profile._id}
    }, {
        new: true
    }).exec((error, result) => {
        if(error) res.status.json(error);
        res.status(200).json(result)
    });
}

exports.addComment = (req, res) => {
    const comment = {
        commentBy:req.profile._id,
        comment: req.body.comment
    };
    Post.findByIdAndUpdate(req.body.post_id, {
        $push: {comments: comment}
    }, {
        new: true
    })
    .populate('comments.commentBy', '_id username')
    .exec((error, result) => {
        if(error) res.status.json(error);
        res.status(200).json(result)
    });
}