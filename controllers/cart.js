
// const Order = require('../model/order');
const db = require('../models');
const Product = db.Product;
const Cart = db.Cart;
const User = db.User;
const Order = db.Order
// const mongoose = require('mongoose')
const { StatusCodes } = require('http-status-codes');
const { NotFoundError,BadRequestError } = require('../errors');
const { validationResult } = require('express-validator');

// add to cart
const addCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => `${error.msg}`).join(',');
      throw new BadRequestError(errorMessages);;
  }
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      return;
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    }
    // Check if the product with given productId already exist or not
    const existingCartItem = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (existingCartItem) {
      // If the product already exists, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      // If the product does not exist, add a new item to the cart
      await Cart.create({
        productId,
        quantity,
        userId,
      });
    }

    res.status(StatusCodes.OK).json({ message: 'Item added to the cart successfully', cart: user.carts });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
}
const getCart = async (req, res) => {
  const userId = req.user.userId
  const user = await Cart.findAll(
    {
      where: { userId: userId },
      include: [{ model: Product }],
    }
  )
  console.log(user);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    return;
  }

  res.status(StatusCodes.OK).json({ data: user });

};
const removeCart = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.productId;

  const user = await User.findByPk(userId);

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    return;
  }

  const deletedCartItem = await Cart.destroy({
    where: {
      userId,
      productId,
    },
  });

  if (deletedCartItem) {
    res.status(StatusCodes.OK).json({ message: 'Item removed from the cart successfully' });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Item not found in the cart' });
  }

};
const postOrder = async (req, res) => {
  //to create an order
  const userId = req.user.userId;

  // Find user's cart items with associated product details
  const cartItems = await Cart.findAll({
    where: { userId: userId },
    include: [{ model: Product }],
  });

  if (!cartItems || cartItems.length === 0) {
    throw new NotFoundError('User not found or cart is empty');
  }

  // Calculate the total price of the items in the cart
  const orderTotal = cartItems.reduce((total, cart) => {
    const product = cart.Product; // Assuming product details are populated
    return total + cart.quantity * product.productPrice;
  }, 0);

  // Create the order items
  const orderItems = cartItems.map((cart) => ({
    productId: cart.productId,
    quantity: cart.quantity,
    price: cart.Product.productPrice,
    productName: cart.Product.productName
  }));

  // Create the order
  const order = await Order.create({
    userId: userId,
    items: orderItems,
    total: orderTotal,
  });

  // Clear the user's cart after placing the order
  await Cart.destroy({ where: { userId } });

  res.status(StatusCodes.CREATED).json({ message: 'Order placed successfully', order });
}

//  to get order summary

const getOrder = async (req, res) => {

  const userId = req.user.userId;

  const orders = await Order.findAll({
    where: { userId: userId },
  });

  res.status(StatusCodes.OK).json({ orders });

};

module.exports = {
  addCart,
  getCart,
  removeCart,
  postOrder,
  getOrder
}