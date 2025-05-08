import { 
    validateErrors
} from "./validate.error.js"
import {
    existEmail,
    existUsername
} from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty')
            .notEmpty(),
        body('surname', 'Surname cannot be empty')
            .notEmpty(),
        body('email', 'Email cannot be empty or is not a valid email')
            .notEmpty()
            .isEmail()
            .custom(existEmail),
        body('username', 'Username cannot be empty')
            .notEmpty()
            .toLowerCase()
            .custom(existUsername),
        body('password', 'Password cannot be empty')
            .notEmpty()
            .isLength({ min: 8 })
            .withMessage('The password must be at least 8 characters long'),
        body('phone', 'Phone cannot be empty or is not a valid phone')
            .notEmpty()
            .isMobilePhone(),
        validateErrors
]

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('The password must be at least 8 characters long')
]