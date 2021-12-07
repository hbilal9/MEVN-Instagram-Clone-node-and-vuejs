const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
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

postSchema.pre('save', function(next){
    this.updated_at = Date.now ();
    next();
});

module.exports = mongoose.model('Post', postSchema);