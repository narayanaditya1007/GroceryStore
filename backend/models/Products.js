const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    seller_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    images: [],
    quantity: Number,
    category:String,
    wishlisted_user_count: Number,
    carted_user_count: Number,
    rating:{
        fivestarCnt: Number,
        fourStarCnt: Number,
        threeStarCnt: Number,
        twoStarCnt: Number,
        oneStartCnt: Number
    }
})

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;