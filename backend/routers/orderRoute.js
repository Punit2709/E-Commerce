const express = require('express');
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require('../middleware/authentication')
const {createOrder} = require('../controller/orderController')

router.route("/order/new").post(isAuthenticatedUser, createOrder);

module.exports = router;