const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (v) {
            return /^[0-9]{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid 10-digit phone number!`
        },
      },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    cart: {
        items: [
          {
            productId: {
              type: mongoose.Types.ObjectId,
              ref: 'Product',
              required: true
            },
            quantity: { type: Number, required: true }
          }
        ]
      }
});


UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.userName },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

module.exports = mongoose.model('User', UserSchema);