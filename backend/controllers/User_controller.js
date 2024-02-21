const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Product = require('../models/Products');
const bcrypt= require('bcrypt');
require('dotenv').config();

async function signup(req,res){
    try{
        console.log("hello");
        const hashPass = await bcrypt.hash(req.body.password,10);
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            password: hashPass,
            phone: req.body.phone,
            user_type: req.body.userType,
            address:{
                locality:req.body.address.locality,
                city: req.body.address.city,
                state:req.body.address.state,
                country: req.body.address.country,
                postal_code: req.body.address.postal_code
            },
            wishlist: [],
            cart: []
        });
        console.log(user)
        await user.save();
        res.status(201).send(user);

    }catch(err){
        console.log("hello");
        console.log(err);
    }
}

async function login(req,res){
    try{
        const user=await User.findOne({email: req.body.email});
        console.log(user)
        if(!user){
            res.send("User not found")
            throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            res.send("Incorrect Password");
            throw new Error("Incorrect Password");
        }

        const token = jwt.sign({email: user.email},process.env.SECRET_KEY);
        res.send({user,token});
    }
    catch(err){
        console.log(err);
    }
}

async function updateDetails(req,res){
    try{
        const user = await User.findOne({email: req.body.email});
        user.password = req.body.password || user.password;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        User.save(user);
    }
    catch(err){
        console.log(err);
    }
}

const getWishlist = async(req,res)=>{
    try{
        const user= await User.findById(req.body.UserId);
        const wishlist = user.wishlist;
        const wishlisted= await Promise.all(wishlist.map(async productId =>{
            return await Product.findById(productId); 
        }));
        return  res.send(wishlisted);
    }
    catch(err){
        console.log(err);
    }
}

const getCart = async(req,res)=>{
    try{
        const user=await User.findById(req.body.UserId);
        console.log(user);
        const cart= user.cart;
        console.log(cart)
        let  carted = await Promise.all(cart.map(async productId =>{
            const pro = await Product.findById(productId); 
            return pro;
        }))
        // let ans = await Promise.all(carted);   
        res.send(carted);
    }
    catch(err){
        console.log(err);
    }
}

const addWishlist = async(req,res)=>{
    try{
        const product =await Product.findById(req.body.productId);
        product.wishlisted_user_count++;
        const user=await User.findById(req.body.UserId);
        user.wishlist = [...user.wishlist,req.body.productId];
        console.log(product);
        console.log(user.wishlist);
        await user.save(); 
        await product.save();
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
}

const addCart = async(req,res)=>{
    try{
        const product =await Product.findById(req.body.productId);
        product.carted_user_count++;
        const user=await User.findById(req.body.UserId);
        user.cart = [...user.cart,req.body.productId];
        await user.save();
        await product.save(); 
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
}

const removeWishlist = async(req,res)=>{
    try{
        const product =await Product.findById(req.body.productId);
        
        const user=await User.findById(req.body.UserId);
        const index = user.wishlist.indexOf(req.body.productId);
        if (index > -1) { // only splice array when item is found
            user.wishlist.splice(index, 1); // 2nd parameter means remove one item only
            product.wishlisted_user_count--;
        }
        console.log(user.wishlist);
        await user.save();
        await product.save();
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
}

const removeCart = async(req,res)=>{
    try{
        const product =await  Product.findById(req.body.productId);
        const user=await User.findById(req.body.UserId);
        const index = user.cart.indexOf(req.body.productId);
        if (index > -1) { // only splice array when item is found
            user.cart.splice(index, 1); // 2nd parameter means remove one item only
            product.carted_user_count--;
        }
        await user.save();
        await product.save();
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
}


module.exports = {
    signup,
    login,
    updateDetails,
    getCart,
    getWishlist,
    addWishlist,
    addCart,
    removeCart,
    removeWishlist
}