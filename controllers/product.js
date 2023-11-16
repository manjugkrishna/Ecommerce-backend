const  Product = require('../model/product');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');



const getAllProducts = async (req, res) => {
    
    const product = await Product.find()
    // const data = pro.map(food => ({
    //     categoryId: food.categoryId,
    //     categoryName: food.categoryName,
    //     photoUrl: food.photoUrl
    //   }));
    res.status(StatusCodes.OK).json({ data:product});

};

//create book and save it in the databse
const createProduct = async (req, res) => {
    const product = await Product.create({
        productId:req.body.productId,
        productSku:req.body.productSku,
        category:req.body.category,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productShortName:req.body.productShortName,
        productDescription:req.body.productDescription,
        createdDate:req.body.createdDate,
        deliveryTimeSpan:req.body.deliveryTimeSpan,
        categoryId:req.body.categoryId,
        productImageUrl:req.body.productImageUrl

    });
    res.status(StatusCodes.CREATED).json({ product });
};

//find foods available 
const getProduct = async (req, res) => {
    const {
        query: { category: category },
    } = req;
    const product = await Product.find({category:category})
    res.status(StatusCodes.OK).json({ product });
};

//update a book in database
const updateProduct = async (req, res) => {
    const {
        params: { id: productId },
    } = req;
    const product = await Product.findOneAndUpdate(
        { _id: productId},
        req.body,
        { new: true, runValidators: true }
    );
    if (!product) {
        throw new NotFoundError(`No product with id ${productId}`);
    }
    res.status(StatusCodes.OK).json({ product});
};

//delete a book from database
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
    res.status(StatusCodes.OK).json({ product});
};

module.exports = {
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProduct

};