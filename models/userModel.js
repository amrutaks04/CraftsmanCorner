const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    phoneNo: {
        type: String,
        required: [true, "Phone number is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    email:{
        type:String,
        required:true
    },
    profilePhoto: {
        type: String
    },
    additionalInfo: {
        type: String
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;