const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        require: true
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

module.exports = mongoose.model('User', userSchema);