const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    buyer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order_date:String,
    amount:Number,
})

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;