const express = require('express');
const router = express.Router();

const { addCart,getCart,removeCart,postOrder,getOrder } = require('../controllers/cart');

router.post('/cart', addCart);
router.get('/cart', getCart);
router.delete('/remove/:productId', removeCart);
router.post('/order', postOrder);
router.get('/order', getOrder);


module.exports = router;