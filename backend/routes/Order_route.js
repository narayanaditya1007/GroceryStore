const express = require('express');
const authenticate_login = require('../middlewares/authenticate_user_login');
const Order_controller = require('../controllers/Order_controller')

const Router = express.Router();

//get list of orders
Router.get('/order',authenticate_login,Order_controller.getAllOrders);

Router.post('/order',authenticate_login,Order_controller.createOrder)

module.exports= Router;