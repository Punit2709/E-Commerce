const Product = require('../models/productModel');

// creating Product 
exports.createProduct = async (req, res, next) =>{ 
    const product =  await Product.create(req.body);
    res.status(200).json({message: 'Product Created', success: true, product});
}


// get products
exports.getAllProducts = (req, res) =>{
    res.status(200).json({message : 'route is working fine'})
};



