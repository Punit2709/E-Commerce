const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview } = require('../controller/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentication');

const router = express.Router();

router.route('/admin/products').get(getAllProducts);
router.route('/admin/products/create').post( isAuthenticatedUser, authorizeRoles('admin'),  createProduct);
router.route('/admin/products/update/:id').put( isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route('/admin/products/delete/:id').delete( isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/products/details/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getAllReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;

