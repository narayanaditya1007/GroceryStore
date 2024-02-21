const Order = require('../models/Orders');

const authorize_buyer = async(req,res,next) =>{
    try{
        const order = await Order.findById(req.body.orderId);
        // console.log(order.buyer_id);
        // console.log(req.body);
        if(order.buyer_id.equals(req.body.UserId)){
            next();
        }
        else{
            throw Error("Not original Buyer");
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = authorize_buyer;