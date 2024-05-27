const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentication');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/create').post( isAuthenticatedUser, authorizeRoles('admin'),  createProduct);
router.route('/products/update/:id').put( isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route('/products/delete/:id').delete( isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/products/details/:id').get(getProductDetails);

module.exports = router;

