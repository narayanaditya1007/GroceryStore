const express = require('express');
const authenticate_login = require('../middlewares/authenticate_user_login');
const authorize_seller = require('../middlewares/authorize_product_seller');
const Product_controller = require('../controllers/Product_controller');

const Router = express.Router();


// search products
Router.get('/product/',authenticate_login,Product_controller.searchProduct);

// search products by category
Router.get('/product/buyer/:category',authenticate_login,Product_controller.searchProductbyCategory);
 

// get products listed by a seller
Router.get('/product/seller',authenticate_login,Product_controller.getListedProducts)


// add new product
Router.post('/product/',authenticate_login,Product_controller.addProduct);


// update product 
Router.put('/product/',authenticate_login,authorize_seller,Product_controller.updateProduct);



module.exports= Router;

