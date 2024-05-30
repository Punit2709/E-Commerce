const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// create order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id, 
    paidAt: Date.now()
  });

  res.status(201).json({
    success: true, 
    message: 'Order Created Successfully', 
    order
  })
});

exports.getSingleOrders = catchAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order){
        return next(new ErrorHandler(404, 'Order not Found'));
    }

    res.status(200).json({
        success: true,
        order
    })
})


// get Loogin User Orders
exports.myOrders = catchAsyncError( async (req, res, next) => {
    const orders = await Order.find({user: req.user._id});

    if(!orders){
        return next(new ErrorHandler(404, 'Noo Order Found'))
    }

    res.status(200).json({
        success: true,
        orders
    });
})
