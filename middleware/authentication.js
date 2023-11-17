const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticate = async (req, res, next) => {
    // check token header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid');
    }

    //verify token
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, name: payload.userName };
        next();//pass to next middleware
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};

module.exports = authenticate;