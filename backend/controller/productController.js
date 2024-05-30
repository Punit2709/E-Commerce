const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeature");

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
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  let productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({ message: "Product Created", success: true, productCount, products });
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


// create and update review
exports.createProductReview = catchAsyncError( async (req, res, next) =>{
  const {rating, comment, productId} = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating : Number(rating), 
    comment,
  }

  const product  = await Product.findById(productId);

  if(!product){
    return next(new ErrorHandler(404, 'Product not Found'));
  }

  const isReviewed = await product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

  if(isReviewed){
    product.reviews.forEach(rev => {
      if(rev.user.toString() === req.user._id.toString()){
        rev.rating = rating;
        rev.comment = comment;
      }
    })
  }
  else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let sumRating = 0;
  product.reviews.forEach(rev => {
    sumRating += rev.rating;
    return sumRating;
  });
  product.rating =  sumRating /product.reviews.length;

  await product.save({validateBeforeSave : false});

  res.status(200).json({
    success: true,
    message: 'Review Created / Updated Successfully'
  })
});

// get All reviews 
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product  = await Product.findById(req.query.id);
  
  if(!product){
    return next(new ErrorHandler(404, 'Product not Found'));
  }

  res.status(200).json({
    success: true, 
    reviews: product.reviews
  })
});

