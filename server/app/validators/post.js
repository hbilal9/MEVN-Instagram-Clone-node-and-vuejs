const { body, validationResult } = require('express-validator');

exports.checkPostSchema = [
    body('title', 'title is required.').notEmpty,
    body('title', 'title must be at least 5 char').isLength({min: 5, max: 50}),
    
    body('body', 'post body is required.').notEmpty,
    body('body', 'post body must be at least 20 chars').isLength({min: 20, max: 2000}),
]

exports.checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(422).json({errors: errors.array()});
    }
    next();
}