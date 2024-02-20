const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    email:{
        type:String
        // required:true
    },
   
    
    policyType: {
        type: String,
        required: [true, 'Policy type is required'],
        enum:['MedicalIn','MotorIn','HealthIn','LifeIn']
    },
    coverage: {
        type: String,
        required: [true, 'Coverage details are required']
    },
    premium: {
        type: Number,
        required: [true, 'Premium amount is required']
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);
