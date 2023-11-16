const express = require('express');
const router = express.Router();


const {
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct
} = require('../controllers/product');

router
    .route('/')
    .post(createProduct)
    .get(getAllProducts);
router
    .route('/category')
    .get(getProduct);
router.route('/:id').delete(deleteProduct).patch(updateProduct);

module.exports = router;