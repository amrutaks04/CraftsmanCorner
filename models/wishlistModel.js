const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    vendorId:{
        type:String,
        reqired:true
    },
    products: [{
        product_id: String,
        quantity: Number
    }]
})

const Wishlist = mongoose.model('wishlist',wishlistSchema);
module.exports = Wishlist;