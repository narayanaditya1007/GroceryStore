const express = require('express');
const authenticate_login = require('../middlewares/authenticate_user_login');
const User_controller=require('../controllers/User_controller');

const Router = express.Router();


// user login
Router.post('/user/login',User_controller.login);


// user singup
Router.post('/user/signup',User_controller.signup);

// update user detail
Router.put('/user/update-details',authenticate_login,User_controller.updateDetails);

// get wishlisted product of a user
Router.get('/user/wishlist',authenticate_login,User_controller.getWishlist);

// get products in cart of a user
Router.get('/user/cart',authenticate_login,User_controller.getCart);

// add product to wishlist
Router.put('/user/addwishlist',authenticate_login,User_controller.addWishlist);

// add product to cart
Router.put('/user/addcart',authenticate_login,User_controller.addCart);

// remove product from wishlist
Router.put('/user/removewishlist',authenticate_login,User_controller.removeWishlist);

// remove product from cart
Router.put('/user/removecart',authenticate_login,User_controller.removeCart);

module.exports= Router;