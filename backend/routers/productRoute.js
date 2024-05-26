const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controller/productController');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/create').post(createProduct);
router.route('/products/update/:id').put(updateProduct);
router.route('/products/delete/:id').delete(deleteProduct);

module.exports = router;

