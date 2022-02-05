const express = require('express');
const router = express.Router();
const validator = require('../app/validators/register');
const {checkPostSchema, checkValidationResult} = require('../app/validators/post');

// Middlewares
const {checkAuth} = require('../app/middlewares/authMiddleware')

// Controllers

const {login, register, getProfile} = require('../app/controllers/AuthController')
const {
        getUserByUsername,getAllUsers , getPostByUsername, followUser, unFollowUser
    } = require('../app/controllers/UserController')
const {
    createPost, getMyPosts, fetchTimelinePosts, likePost, unlikePost, addComment
} = require('../app/controllers/PostController')

// Routes

router.post('/login' , login);
router.post('/register',validator.registerSchema, validator.getValidationResult , register);

router.get('/get-all-users', checkAuth, getAllUsers);
router.get('/get-profile', checkAuth, getProfile);

router.post('/create-post', checkAuth, createPost);
router.get('/get-my-posts', checkAuth, getMyPosts);
router.get('/get-timeline-posts', checkAuth, fetchTimelinePosts);
router.post('/like-post', checkAuth, likePost);
router.post('/unlike-post', checkAuth, unlikePost);
router.post('/add-comment', checkAuth, addComment);
router.post('/follow-user', checkAuth, followUser);
router.post('/unfollow-user', checkAuth, unFollowUser);
router.get('/get-user-profile/:username', getUserByUsername);
router.get('/get-user-posts/:username', getPostByUsername);




module.exports = router;