const path = require('path');
const db = require('../models');
const Product=db.Product;
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');



const getAllProducts = async (req, res) => {
    // find all products
    const product = await Product.findAll({})
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
    const product = await Product.findAll({ where: { category:category } })
    res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
    const {
        params: { id: productId },
    } = req;
    const product = await Product.update( req.body,{where:{ id: productId }}
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
    const product = await Product.destroy({where:{
        id: productId
}});
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