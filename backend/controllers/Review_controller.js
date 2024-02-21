const express = require('express');
const Reviews = require('../models/Reviews');
const Product = require('../models/Products')

const getAllReviews = async(req,res)=>{
    try{
        const allReviews = await Reviews.find({product_id:req.body.productId});
        res.send(allReviews);
    }
    catch(err){
        console.log(err);
    }
}

const addReview = async(req,res)=>{
    try{
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const product = await Product.findById(req.body.productId);
        switch (req.body.rating) {
            case 5:
                product.rating.fivestarCnt++;
                break;
            case 4:
                product.rating.fourStarCnt++;
                break;
            
            case 3:
                product.rating.threeStarCnt++;
                break;

            case 2:
                product.rating.twoStarCnt++;
                break;

            case 1:
                product.rating.oneStartCnt++;
                break;
        
            default:
                break;
        }
        const review = new Reviews({
            user_id: req.body.UserId,
            product_id: req.body.productId,
            rating: req.body.rating,
            review: req.body.review,
            review_date: `${day}-${month}-${year}`
        })
        await review.save();
        await product.save();
        res.send(review);
    }
    catch(err){
        console.log(err);
    }
}

const deleteReview = async(req,res)=>{
    try{
        const review = Reviews.findById(req.body.reviewId);
        const product = Product.findById(review.product_id);
        switch (review.rating) {
            case 5:
                product.rating.fivestarCnt--;
                break;
            case 4:
                product.rating.fourStarCnt--;
                break;
            case 3:
                product.rating.threeStarCnt--;
                break;
            case 2:
                product.rating.twoStarCnt--;
                break;
            case 1:
                product.rating.oneStartCnt--;
                break;
        
            default:
                break;
        }
        await Reviews.deleteOne({_id:req.body.reviewId});
        product.save();
        res.status(200).send();
    }
    catch(err){
        console.log(err);
    }
}

module.exports={
    getAllReviews,
    addReview,
    deleteReview
}