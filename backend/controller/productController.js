const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

// creating Product : Admin
exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res
            .status(200)
            .json({ message: "Product Created", success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// update product : Admin
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler(404, 'Product not Found'));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res
            .status(200)
            .json({ success: true, message: "Product Updated", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// delete product : Admin
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler(404, 'Product Found'));
        }

        // deleting product
        await Product.deleteOne({ _id: req.params.id });
        res
            .status(200)
            .json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// get products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res
            .status(200)
            .json({ message: "Product Created", success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// single Product : for details
exports.getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler(404, 'Product not Found'));
        }

        res
            .status(200)
            .json({ success: true, message: "Product Details Fetched", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};