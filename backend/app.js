const express = require('express');
const mongoose = require('mongoose')
const userRouter = require('./routes/User_route');
const orderRouter = require('./routes/Order_route');
const orderItemRouter = require('./routes/Order_Items_route');
const productRouter = require('./routes/Product_route');
const reviewRouter = require('./routes/Review_route');
require('dotenv').config();

try{
mongoose.connect("mongodb+srv://narayanaditya1007:ljGbLrsU86qJGflX@cluster0.rcrnvut.mongodb.net/?retryWrites=true&w=majority");
const app=express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(orderItemRouter);
app.use(orderRouter);
app.use(productRouter);
app.use(reviewRouter);

app.listen(PORT,()=>{
    console.log(`Server started on port: ${PORT}`);
})
}
catch(err){
    console.log("mongoose not connected");
}
