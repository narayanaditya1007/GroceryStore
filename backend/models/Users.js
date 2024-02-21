const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    phone: String,
    user_type: String,
    address:{
        locality: String,
        city: String,
        state: String,
        country: String,
        postal_code: String
    },
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product'
    },
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product'
    }
})

const User = mongoose.model("User",UserSchema);
module.exports = User;