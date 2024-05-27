const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controller/productController');
const isAuthenticatedUser = require('../middleware/authentication');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/create').post( isAuthenticatedUser, createProduct);
router.route('/products/update/:id').put( isAuthenticatedUser, updateProduct);
router.route('/products/delete/:id').delete( isAuthenticatedUser, deleteProduct);
router.route('/products/details/:id').get(getProductDetails);

module.exports = router;

