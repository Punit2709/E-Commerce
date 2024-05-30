const express = require('express');
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require('../middleware/authentication')
const {createOrder, getSingleOrders, myOrders} = require('../controller/orderController')

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrders);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

module.exports = router;