const express = require('express');
const Orders = require('../models/Orders');
const OrderItems = require('../models/Order_Items');
const User = require('../models/Users');
const Product = require('../models/Products');
const { default: mongoose } = require('mongoose');

const getAllOrders = async(req,res)=>{
    try{
        const allOrders = await Orders.find({buyer_id: req.body.UserId});
        res.send(allOrders);
    }
    catch(err){
        console.log(err);
    }
}

const createOrder = async(req,res)=>{
    try{
        const myId=new mongoose.Types.ObjectId();
        console.log(myId);
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const curUser= await User.findById(req.body.UserId);
        let amount=0;
        console.log(curUser.cart);
        for(let productId of curUser.cart){
            console.log(productId);
            const orderItem = new OrderItems({
                order_id:myId,
                product_id: productId,
                exp_delivery_date:`${day+5}-${month}-${year}`,
                status: "placed"
            });
            const curProduct = await Product.findById(productId);
            amount+= curProduct.price;
            console.log(orderItem);
            console.log(curProduct);
            await orderItem.save();
        }
        const curOrder= new Orders({
            _id:myId,
            buyer_id:req.body.UserId,
            order_date: Date.now(),
            amount:amount
        })
        console.log(curOrder);
        await curOrder.save();
        curUser.cart = [];
        await curUser.save();
        res.send(curOrder)
    }
    catch(err){
        console.log(err);
    }
}

module.exports= {
    getAllOrders,
    createOrder
}