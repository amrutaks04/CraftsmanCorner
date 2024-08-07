const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },productName:{
        type:String,
        required:true
    },productDes:{
        type:String
    },category:{
        type:String
    },price:{
        type:Number,
        required:true
    },image:{
        type:String
    },vendorId:{
        type:String,
        required:true
    }
})

const Product = mongoose.model('product',productSchema);
module.exports = Product;