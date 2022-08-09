const express = require('express');


const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();
const isAuth = require('../middleware/is-auth');

const { body } = require('express-validator');

    router.post('/register', [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value) => {
                return User.findOne({email : value}).then(userDoc => {
                    if(userDoc) {
                        return Promise.reject('E-mail address already exists !');
                    }
                });
            }),
            //.normalizeEmail(),
        body('password').trim().isLength({min : 6})
    ], authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);


module.exports = router;