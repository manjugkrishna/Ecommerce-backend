const express = require('express');
const router = express.Router();

const { addCart,getCart,removeCart } = require('../controllers/cart');


router.post('/cart', addCart);
router.get('/cart', getCart);
router.delete('/remove/:productId', removeCart);


module.exports = router;