const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler").default;
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeature");

// creating Product : Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({ message: "Product Created", success: true, product });
});

// update product : Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, message: "Product Updated", product });
});

// delete product : Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product Found"));
  }

  // deleting product
  await Product.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

// get products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  console.log(req.query);
  
  const apiFeature = new ApiFeatures(Product.find(), req.query).search();

  console.log(apiFeature);
  const products = await apiFeature.query;
  res.status(200).json({ message: "Product Created", success: true, products });
});

// single Product : for details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  res
    .status(200)
    .json({ success: true, message: "Product Details Fetched", product });
});
