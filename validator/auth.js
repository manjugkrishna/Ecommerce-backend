const { body } = require('express-validator');
 
const validateSignUp = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3}).withMessage('Username must be at least 3 characters long'),
 
 
  body('email')
  .notEmpty().withMessage('email is required')
    .isEmail().withMessage('Invalid email address'),
 
  body('password')
  .notEmpty().withMessage('password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),
 
  body('phoneNumber')
  .notEmpty().withMessage('phonenumber is required')
    .isMobilePhone().withMessage('Invalid mobile number'),
];
const validateLogin=[
    body('email')
    .notEmpty().withMessage('email is required')
      .isEmail().withMessage('Invalid email address'),
    body('password')
    .notEmpty().withMessage('password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),
 
]
const validateaddCart = [
    
    body('productId').notEmpty().withMessage('Product ID is required').isUUID().withMessage('Id must be UUID'),
    body('quantity').notEmpty().withMessage('Quantity is required').isInt().withMessage('Quantity must be a valid integer'), 
    ]
const validateAddress = [
      body('address')
        .notEmpty().withMessage('Address is required')
        .isLength({ max: 30 }).withMessage('Password must be at least 8 characters long'),
     
      body('city')
      .notEmpty().withMessage('city is required'),
     
      body('country')
      .notEmpty().withMessage('country is required'),   
      body('state')
      .notEmpty().withMessage('state is required'),
      body('postalCode')
      .notEmpty().withMessage('postalcode is required')
        
    ];
 
module.exports = {
  validateSignUp,
  validateLogin,
  validateaddCart,
  validateAddress
};
 