const express = require('express');
const router = express.Router();
const validator = require('../app/validators/register');
const {checkPostSchema, checkValidationResult} = require('../app/validators/post');

// Middlewares
const {checkAuth} = require('../app/middlewares/authMiddleware')

// Controllers

const {login, register, getProfile} = require('../app/controllers/AuthController')
const {
    createPost, getMyPosts, fetchTimelinePosts, likePost, unlikePost
} = require('../app/controllers/PostController')

// Routes

router.post('/login' , login);
router.post('/register',validator.registerSchema, validator.getValidationResult , register);

router.get('/get-profile', checkAuth, getProfile);

router.post('/create-post', checkAuth, createPost);
router.get('/get-my-posts', checkAuth, getMyPosts);
router.get('/get-timeline-posts', checkAuth, fetchTimelinePosts);
router.post('/like-post', checkAuth, likePost);
router.post('/unlike-post', checkAuth, unlikePost);




module.exports = router;