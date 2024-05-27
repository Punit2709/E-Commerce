const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controller/productController');
const isAuthenticatedUser = require('../middleware/authentication');

const router = express.Router();

router.route('/products').get( isAuthenticatedUser, getAllProducts);
router.route('/products/create').post(createProduct);
router.route('/products/update/:id').put(updateProduct);
router.route('/products/delete/:id').delete(deleteProduct);
router.route('/products/details/:id').get(getProductDetails);

module.exports = router;

