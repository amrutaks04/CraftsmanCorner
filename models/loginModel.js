const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');

const loginSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },name:{
        type:String,
        required:[true,"How to address you"],
        unique:true
    },email:{
        type:String,
        required:[true,"Email required"]
    },password:{
        type:String,
        required:[true,'Password required']
    },role:{
        type:String,
        enum:['user','admin','vendor'],
        required:[true,'what your role?']
    }  ,vendorName:{
        type:String,
        required: function(){
            return this.role=='vendor'
        }
    }, vendorAddress: {
        type: String,
        required: function(){
            return this.role=='vendor'
        }
      },
      vendorLicense: {
        type: String,
        required: function(){
            return this.role=='vendor'
        }
      },
})

loginSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next(); 
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
 })

const Login = mongoose.model('login',loginSchema);
module.exports=Login;