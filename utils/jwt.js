
const jwt = require('jsonwebtoken');



exports.generateAccessToken = (id) => {
    return jwt.sign(
        { userId: id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};