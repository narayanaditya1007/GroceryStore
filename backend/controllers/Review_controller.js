const express = require('express');
const Reviews = require('../models/Reviews');

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
        const review = new Reviews({
            user_id: req.body.UserId,
            product_id: req.body.productId,
            rating: req.body.rating,
            review: req.body.review,
            review_date: `${day}-${month}-${year}`
        })
        await review.save();
        res.send(review);
    }
    catch(err){
        console.log(err);
    }
}

const deleteReview = async(req,res)=>{
    try{
        await Reviews.deleteOne({_id:req.body.reviewId});
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