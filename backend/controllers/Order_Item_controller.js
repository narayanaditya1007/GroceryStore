const express = require('express');
const OrderItem = require('../models/Order_Items');

const getAllItemforBuyer = async(req,res)=>{
    try{
        const allItemsofOrder= await OrderItem.find({order_id: req.body.orderId});
        res.send(allItemsofOrder);
    }
    catch(err){
        console.log(err);
    }
}

const getAllItemforSeller = async(req,res)=>{
    try{
        const allItemofSeller= await OrderItem.find({seller_id: req.body.UserId});
        res.send(allItemofSeller);
    }
    catch(err){
        console.log(err);
    }
}

const updateStatus = async(req,res)=>{
    try{
        const curItem = await OrderItem.findById(req.body.itemId);
        curItem.status = req.body.status || curItem.status;
        curItem.exp_delivery_date = req.body.deliveryDate || curItem.exp_delivery_date;
        curItem.save();
        res.send(curItem);
    }
    catch(err){
        console.log(err);
    }
}


const cancelOrder = async(req,res)=>{
    try{
        const curItem = await OrderItem.findById(req.body.itemId);
        curItem.status = "cancel";
        curItem.exp_delivery_date = null;
        curItem.save();
        res.send(curItem);
    }
    catch(err){
        console.log(err);
    }
}

module.exports={
    getAllItemforBuyer,
    getAllItemforSeller,
    updateStatus,
    cancelOrder
}
