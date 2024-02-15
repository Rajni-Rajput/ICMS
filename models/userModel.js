const mongoose =require('mongoose')
const userSchema = new mongoose.Schema({
    role:{
        type:String,
        required:[true,'role is required'],
        enum:['admin','user']
    },
    name:{
        type:String,
        required: [true,'required']
    },
    email:{
        type: String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    phone:{
        type: String,
        required:[true,'phone no. is required']
    }
}, {timestamps:true});
module.exports = mongoose.model('users',userSchema)