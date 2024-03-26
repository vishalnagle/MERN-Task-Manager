const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const validateTask = [
    body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
    body('description').optional().isString().withMessage('Description should be a string'),
    body('completed').optional().isBoolean().withMessage('Completed should be a boolean value'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateTask };

