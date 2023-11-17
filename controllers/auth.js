const User = require('../model/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const bcrypt = require("../utils/bcrypt");
//signup
const signUp = async (req, res) => {
    let {
        username,
        email,
        password,
        phoneNumber
    } = req.body;
    const emailAlreadyExists = await User.findOne({ email });
    const mobileAlreadyExists = await User.findOne({ phoneNumber })
    if (emailAlreadyExists && mobileAlreadyExists) {
        throw new BadRequestError('both email and password exists')
    } else if (emailAlreadyExists) {
        throw new BadRequestError("email already exists");//check email
    } else if (mobileAlreadyExists) {
        throw new BadRequestError("mobile number already exists");//check email
    }
    password = await bcrypt.hashPassword(password);
    const user = await User.create({ userName: username, email: email, password: password, phoneNumber: phoneNumber });
    res.status(StatusCodes.CREATED).json({
        user: { name: user.userName },
        msg: 'signup successful',
    });
};

//login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');//check email
    }
    const isPasswordCorrect = await bcrypt.verifyPassword(
        password,
        user.password
    );
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid password");//compare password
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: { name: user.userName },
        msg: 'login successful',
        token,
    });
};

module.exports = {
    signUp,
    login,
};