const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minlength: 20,
        maxlength: 20000
    },
    img: {
        type: String,
    },
    postedBy: {
        type: ObjectId,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);