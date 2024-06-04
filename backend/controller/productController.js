const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeature");
const { contains } = require("validator");

// creating Product : Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

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
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  let productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res
    .status(200)
    .json({
      success: true,
      productsCount,
      resultPerPage,
      products,
    });
});

// single Product : for details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  res
    .status(200)
    .json({ success: true, product });
});

// create and update review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  const isReviewed = await product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let sumRating = 0;
  product.reviews.forEach((rev) => {
    sumRating += rev.rating;
    return sumRating;
  });
  product.rating = sumRating / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review Created / Updated Successfully",
  });
});

// get All reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete Product reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not Found"));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );

  let sumRating = 0;
  reviews.forEach((rev) => {
    sumRating += rev.rating;
  });

  const rating = sumRating / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      rating,
      numOfReviews,
      reviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    message: "Review Deleted",
  });
});
