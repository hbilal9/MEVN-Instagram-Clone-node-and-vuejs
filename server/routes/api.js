const express = require('express');
const router = express.Router();
const validator = require('../app/validators/register');

// Middlewares
const {checkAuth} = require('../app/middlewares/authMiddleware')

// Controllers

const {login, register} = require('../app/controllers/AuthController')

router.post('/login' , login);
router.post('/register',validator.registerSchema, validator.getValidationResult , register);


router.post('/profile',checkAuth , (req, res) => {
    res.send({user: req.profile})
});




module.exports = router;