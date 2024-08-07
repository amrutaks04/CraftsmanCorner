const mongoose = require('mongoose');

const vendorSchema= new mongoose.Schema({
  vendorId:{
    type:String,
    required:true
  },
    vendorName:{
        type:String,
        required:true
    }, vendorAddress: {
        type: String,
        required: true
      },phoneNo:{
       type:String,
       required:true 
      },email:{
        type:String,
        required:true
      },socialMediaLink:{
        type:String
      },businessDescription:{
        type:String
      },businessType:{
        type:String
      },yearsOfExperience:{
        type:Number
      },profilePhoto:{
        type:String
      },
      verificationStatus:{
        type:Boolean,
        default:false
      },additionalInfo:{
        type:String
      }
})

const Vendor = mongoose.model('vendor',vendorSchema);
module.exports = Vendor;