const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/auth');
const {validateLogin,validateSignUp}=require('../validator/auth')

router.post('/signup', validateSignUp,signUp);
router.post('/login', validateLogin,login);

module.exports = router;