const mongoose = require('mongooes');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product Name is required'],
        maxLength: 30,
    },
    description: {
        type: String,
        required: [true, 'Product Descprition is required'],
        maxLength: 120,
    },
    price: {
        type: Number,
        required: [true, 'Product Price is required'],
        min: 0,
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
        }
    }],
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    stock:{
        type: Number, 
        required: [true, 'Product category is required'],
        maxLength: 3, 
        default: 1,
    }, 
    numOfReviews:{
        type: Number, 
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name:{
                type: String,
                required: true,
            }, 
            rating:{
                type:Number,
                required: true,
            }, 
            comment:{
                type:String, 
                required: true,
            }
        }
    ], 
    createdAt:{
        type: Date, 
        default: Date.now
    }
},{ timeStamp: true});

module.exports = mongoose.model("Product", ProductSchema)