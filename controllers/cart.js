const User = require('../model/user');
const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

// add to cart
const addCart = async (req, res) => {
  let {
    productId,
    quantity
  } = req.body;
  const userId = req.user.userId
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("user not found");
  }
  // Check if the product with given productId already exist or not
  const existingCartItemIndex = user.cart.items.findIndex(
    item => item.productId.toString() === productId
  );

  // If the product already exists, update the quantity
  if (existingCartItemIndex !== -1) {
    user.cart.items[existingCartItemIndex].quantity += quantity;
  } else {
    // If the product does not exist, add a new item to the cart
    user.cart.items.push({
      productId: productId,
      quantity: quantity
    });
  }
  // Save the updated user with the new cart
  await user.save();
  res.status(StatusCodes.OK).json({ message: 'Item added to the cart successfully', cart: user.cart.items });
};

const getCart = async (req, res) => {
  const product = await User.findById(req.user.userId).populate('cart.items.productId');
  console.log(product.cart)
  res.status(StatusCodes.OK).json({ data: product.cart });

};

const removeCart = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.productId; //productId passed as route parameter
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const existingCartItemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingCartItemIndex !== -1) {
      // If the item exists in the cart, remove it
      user.cart.items.splice(existingCartItemIndex, 1);
      await user.save();
      res.status(StatusCodes.OK).json({ message: 'Item removed from the cart successfully' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Item not found in the cart' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};
module.exports = {
  addCart,
  getCart,
  removeCart
}