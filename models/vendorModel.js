const mongoose = require('mongoose');

const vendorSchema= new mongoose.Schema({
    vendorName:{
        type:String,
        required:true
    }, vendorAddress: {
        type: String,
        required: true
      },
      vendorLicense: {
        type: String,
        required: true
      },
      verificationStatus:{
        type:Boolean,
        default:false
      }
})

const Vendor = mongoose.model('vendor',vendorSchema);
module.exports = Vendor;