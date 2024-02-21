const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating:Number,
    review: String,
    review_date: String
})

const Review = mongoose.model("Review",ReviewSchema);
module.exports = Review;