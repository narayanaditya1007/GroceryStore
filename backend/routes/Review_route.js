const express = require('express');
const authorize_review = require('../middlewares/authorize_review_owner');
const authenticate_login = require('../middlewares/authenticate_user_login');
const review_controller = require('../controllers/Review_controller');
const Router = express.Router();


//get all review for product
Router.get('/review',authenticate_login,review_controller.getAllReviews);


// add review
Router.post('/review',authenticate_login,review_controller.addReview);


// delete review
Router.delete('/review',authenticate_login,authorize_review,review_controller.deleteReview);

module.exports= Router;