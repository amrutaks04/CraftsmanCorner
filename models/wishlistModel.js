const mongoose = require('mongoose');
const Vendor = require('./vendorModel');

const wishlistSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    }, 
    // vendorId:{
    //     type:String,
    //     required:true
    // },
    products: [{
        product_id: String,
        quantity: Number,
        vendorId:String
    }]
})

const Wishlist = mongoose.model('wishlist',wishlistSchema);
module.exports = Wishlist;