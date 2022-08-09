const jwt = require("jsonwebtoken");
const TokenBlack = require('../models/tokenblack');


module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated !');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];

    /* Blacklist */
    result = await TokenBlack.findOne({ token: token });

    if (result) {
        const error = new Error('Token Blacklisted !');
        error.statusCode = 401;
        next(error);
    }
    /***********/

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'supersecretcode'); //Decode AND verify token
    }
    catch (err) {
        err.statusCode = 500;
        throw err;
    }


    if (!decodedToken) {
        const error = new Error('Not authenticated !');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
}

