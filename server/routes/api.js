const express = require('express');
const router = express.Router();
const validator = require('../app/validators/register');
const {checkPostSchema, checkValidationResult} = require('../app/validators/post');

// Middlewares
const {checkAuth} = require('../app/middlewares/authMiddleware')

// Controllers

const {login, register} = require('../app/controllers/AuthController')
const {createPost, getMyPosts, fetchTimelinePosts} = require('../app/controllers/PostController')

// Routes

router.post('/login' , login);
router.post('/register',validator.registerSchema, validator.getValidationResult , register);


router.post('/create-post', checkAuth, createPost);
router.get('/get-my-posts', checkAuth, getMyPosts);
router.get('/get-timeline-posts', checkAuth, fetchTimelinePosts);




module.exports = router;