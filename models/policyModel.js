const mongoose =require('mongoose')
const adminSchema = new mongoose.Schema({
    role:{
        type:String,
        required:[true,'role is required'],
        enum:['admin','user']
    },
    name:{
        type:String,
        required: [true,'required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
}, {timestamps:true});
module.exports = mongoose.model('',adminSchema)