const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    email:{
        type:String
        // required:true
    },
    InsuranceId:{
        type:String,
        unique:true,
        ref: 'policyModel'
    },
    status: {
        type: String,
        enum:['pending','accepted','rejected'],
        default: 'pending'
    },
    amount: {
        type: String,
        required: [true, 'Claim amount is required']
    },
    residual_amount:{
        type:String,
        //required:true
    },
    reason: {
        type: String,
        required: [true, 'Reason is required']
    },
    requestedDate: {
        type: Date,
        default: Date.now
    },
    remarks:{
        type: String,
        default:null
    }
    
}, { timestamps: true });

// Define a virtual property to format requestedDate as "YYYY-MM-DD"
claimSchema.virtual('requestedDateString').get(function() {
    return this.requestedDate.toISOString().slice(0, 10);
});

module.exports = mongoose.model('claim', claimSchema);
