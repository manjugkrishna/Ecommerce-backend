const db = require('../models');
const User=db.User;
const jwt=require('../utils/jwt')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const bcrypt = require("../utils/bcrypt");
const { validationResult } = require('express-validator');
//signup
const signUp = async (req, res) => {
    
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => `${error.msg}`).join(',');
 
        // Throw the error
        throw new BadRequestError(errorMessages);;
    }
    
    let {
        username,
        email,
        password,
        phoneNumber
    } = req.body;
    const emailAlreadyExists = await User.findOne({ where: { email } });
const mobileAlreadyExists = await User.findOne({ where: { mobileNumber:phoneNumber } });
    if (emailAlreadyExists && mobileAlreadyExists) {
        throw new BadRequestError('both email and mobile number exists')
    } else if (emailAlreadyExists) {
        throw new BadRequestError("email already exists");//check email
    } else if (mobileAlreadyExists) {
        throw new BadRequestError("mobile number already exists");//check email
    }
    password = await bcrypt.hashPassword(password);
    const user = await User.create({ username: username, email: email, password: password, mobileNumber: phoneNumber });
    res.status(StatusCodes.CREATED).json({
        user: { name: user.username },
        msg: 'signup successful',
    });
};

//login
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => `${error.msg}`).join(',');
 
        // Throw the error
        throw new BadRequestError(errorMessages);;
    }
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ where: { email } });
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

    const token = jwt.generateAccessToken(user.id);
    res.status(StatusCodes.OK).json({
        user: { name: user.username },
        msg: 'login successful',
        token,
    });
};

module.exports = {
    signUp,
    login,
};