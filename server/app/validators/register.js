const { body, validationResult } = require('express-validator');

exports.registerSchema = [
    body('first_name', 'First name is required.').notEmpty(),
    body('first_name', 'First name is min 2 char').isLength({min: 2}),

    body('last_name', 'Last name is required.').notEmpty(),
    body('last_name', 'Last name is min 2 char').isLength({min: 2}),

    body('email', 'Email is required.').notEmpty(),
    body('email', 'Invalid Email').isEmail(),

    body('password', 'Password is required.').notEmpty(),
    body('password', 'Password is min 5 char').isLength({min: 5})

]

exports.getValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
}