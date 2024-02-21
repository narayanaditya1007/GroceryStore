const express = require('express');
const authenticate_login = require('../middlewares/authenticate_user_login');
const authorize_buyer = require('../middlewares/authorize_product_buyer');
const authorize_seller = require('../middlewares/authorize_product_seller');
const Order_item_controller = require('../controllers/Order_Item_controller');
const Router = express.Router();

// get all items in an order
Router.get('/order/item/buyer',authenticate_login,authorize_buyer,Order_item_controller.getAllItemforBuyer);

// get all ordered items --seller
Router.get('/order/item/seller',authenticate_login,Order_item_controller.getAllItemforSeller)


// update delivery status --seller
Router.put('/order/item/update',authenticate_login,authorize_seller,Order_item_controller.updateStatus);


// cancel order --buyer
Router.put('/order/item/cancel',authenticate_login,Order_item_controller.cancelOrder);

module.exports= Router;



