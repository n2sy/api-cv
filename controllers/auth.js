const User = require('../models/user');
const TokenBlack = require('../models/tokenblack');

const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422; //L’entité fournie avec la requête est incompréhensible ou incomplète.
        error.data = errors.array();
        // console.log("*********");
        // console.log(error.data);
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);

    bcrypt.hash(password, 12)
        .then(hashedPwd => {
            const user = new User({
                email: email,
                password: hashedPwd

            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'User Created', userId: result['_id'],
                created: result.createdAt
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    //console.log(email, password);

    User.findOne({ email: email })
        .then(u => {
            if (!u) {
                const error = new Error('A user with this mail could not be found');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = u;
            return bcrypt.compare(password, loadedUser.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error("Wrong Password !!");
                error.statusCode = 401;
                throw error;
            }
            //res.status(200).json({message : 'User logged !'});
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
                'supersecretcode',
                { expiresIn: '12h' }
            );

            res.status(200).json({ message: 'User logged !', token: token, userId: loadedUser._id.toString() });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

exports.logout = async (req, res, next) => {

    const token = req.get('Authorization').split(' ')[1];
    newToken = new TokenBlack({
        token: token
    })
    try {
        result = await newToken.save();
        res.status(200).json({ message: 'User disconnected', tokenId: result['_id'] });

    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


}