const Product = require('../model/product');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');



const getAllProducts = async (req, res) => {
    // find all products
    const product = await Product.find()
    res.status(StatusCodes.OK).json({ data: product });

};

// create Product
const createProduct = async (req, res) => {
    const product = await Product.create({
        productId: req.body.productId,
        productSku: req.body.productSku,
        category: req.body.category,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productShortName: req.body.productShortName,
        productDescription: req.body.productDescription,
        createdDate: req.body.createdDate,
        deliveryTimeSpan: req.body.deliveryTimeSpan,
        categoryId: req.body.categoryId,
        productImageUrl: req.body.productImageUrl

    });
    res.status(StatusCodes.CREATED).json({ product });
};

const getProduct = async (req, res) => {
    const {
        query: { category: category },
    } = req;
    const product = await Product.find({ category: category })
    res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
    const {
        params: { id: productId },
    } = req;
    const product = await Product.findOneAndUpdate(
        { _id: productId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!product) {
        throw new NotFoundError(`No product with id ${productId}`);
    }
    res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
    const {
        params: { id: productId }
    } = req;
    const product = await Product.findOneAndDelete({
        _id: productId
    });
    if (!product) {
        throw new NotFoundError(`No product with id ${productId}`);
    }
    res.status(StatusCodes.OK).json({ product });
};

module.exports = {
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct
};