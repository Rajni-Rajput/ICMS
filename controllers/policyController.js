const policyModel = require('../models/policyModel');
const userModel = require('../models/userModel');
const middleware = require('../middlewares/middleware');
const claimModel = require('../models/claimModel')

// const postPolicy = async (req,res) =>{
//     try {

//         const { policyType, premium, coverage } = req.body;
          
//         // Check if the policy with the given policyId already exists
//         const existingPolicy = await policyModel.findOne({email});
//         if (existingPolicy) {
//             return res.status(200).json({ message: "Policy with this policyId already exists" });
//         }

//         // Create a new policy
//         const policy = new policyModel({
//             policyType, 
//             premium, 
//             coverage
//         });

//         await policy.save();

//         return res.status(201).json({
//             success: true,
//             message: 'Policy added successfully!',
//             policy
//         });
//     } catch (error) {
//         return res.status(500).send({
//             success: false,
//             message: 'Error in adding policy',
//             error
//         });
//     }
// }


const listpolicyController = async(req,res) =>{

    try {
        const policies = await policyModel.find();

        // Send the policies as a response
        return res.status(200).json({
            success: true,
            data: policies
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in retrieving policies',
            error: error.message
        });
    }

}

const deletepolicyController = async (req, res) => {
    try {
        const policyId = req.body._id; 

        const deletedPolicy = await policyModel.findByIdAndDelete(policyId);

        if (!deletedPolicy) {
            return res.status(404).json({
                success: false,
                message: 'Policy not found'
            });
        }else{
            return res.status(200).json({
                success: true,
                message: 'Policy deleted successfully',
                deletedPolicy
            });
        }

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in deleting policy',
            error: error.message
        });
    }
}


const selectPolicy = async (req, res) => {
    const { email, policyType,premium,coverage} = req.body;

    try {
       
        const policy = new policyModel({
                        email,
                        policyType, 
                        premium, 
                        coverage,
                     
                    });

        const user = await userModel.findOne({ email });
        if (!user) {

            return res.status(404).json({ message: "User not found" });
        }
        //policyModel.userEmail = user.email;
        // policy.InsuranceId = 
        // policyModel.InsuranceId =req.uniqueId;

        await policy.save();

        return res.status(200).json({ 
            message: "Policy selected successfully", 
            policy: {
                email: email,
                // policyId: policy.policyId,
                policyType: policyType,
                coverage: coverage,
                premium: premium,
                // InsuranceId: InsuranceId
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const userPolicyList = async (req,res) => {
    const {email} =req.body
    try {

        // Find the user by email
        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw new Error("User not found");
        }

        // Fetch policies associated with the user's email
        const policies = await policyModel.find({ email: email });
        return res.status(200).json({
            success: true,
            data: policies
        });
        //return policies;
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in retrieving policies',
            error: error.message
        });
    }
};


// const claimPolicy = async(req,res) =>{
//     const { email,InsuranceId,policyId, amount, reason, date, status} = req.body;

//     try {
//         // Find the user by email
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         claimId = 

//         // Fetch the user's policy and insurance ID
//         // const { InsuranceId, policyId } = Policy;

//         // // Find the policy associated with the user
//         // const policy = await Policy.findOne({ InsuranceId, policyId });

//         // if (!policy) {
//         //     return res.status(404).json({ message: 'Policy not found for the user' });
//         // }

//         claim.claimId =

//         await claim.save();

//         return res.status(200).json({ 
//             message: "Claim submitted successfully!", 
//             claim: {
//                 email: email,
//                 amount: amount,
//                 reason: reason,
//                 status: "pending",
//                 claimId: claim.claimId,
//                 InsuranceId: InsuranceId,
//                 policyId: policy.policy
                
//             }
//         });

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

const claimPolicy = async (req, res) => {
    const { email, InsuranceId, status, amount, reason, residual_amount } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const policy = await policyModel.findOne({ _id: InsuranceId });

        // If the policy is not found, return an error
        if (!policy) {
            return res.status(404).json({ message: "Policy not found" });
        }
        const existingClaim = await claimModel.findOne({ InsuranceId });
        if (existingClaim) {
            return res.status(400).json({ message: "Claim already exists for this insurance id" });
        }

        // Create a new claim document
        const newClaim = new claimModel({
            email: email,
            InsuranceId: InsuranceId,
            status: status,
            amount: amount,
            reason: reason,
            residual_amount: residual_amount
        });
        

        // Save the new claim document
        await newClaim.save();
        console.log(newClaim)

        return res.status(200).json({ 
            message: "Claim submitted successfully", 
            claim: newClaim
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const userClaimList = async (req,res) => {
    const {email} =req.body
    try {

        // Find the user by email
        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw new Error("User not found");
        }

        // Fetch policies associated with the user's email
        const claims = await claimModel.find({ email: email });
        return res.status(200).json({
            success: true,
            data: claims
        });
        //return policies;
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in retrieving claims',
            error: error.message
        });
    }
};
const listClaimController = async(req,res) =>{

    try {
        const claims = await claimModel.find();

        // Send the policies as a response
        return res.status(200).json({
            success: true,
            data: claims
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in retrieving policies',
            error: error.message
        });
    }

}
const approveClaim = async (req, res) => {
    try {
        const { _id, remarks } = req.body;

        // Find the claim by ID and update its status and remarks
        const claim = await claimModel.findByIdAndUpdate(_id, { status: 'Accepted', remarks: remarks }, { new: true });

        // Check if claim exists
        if (!claim) {
            return res.status(404).send({
                message: 'Claim not found'
            });
        }

        res.status(200).json({ message: 'Claim approved successfully', claim });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const rejectClaim = async (req, res) => {
    try {
        const { _id, remarks } = req.body;

        // Find the claim by ID and update its status and remarks
        const claim = await claimModel.findByIdAndUpdate(_id, { status: 'Rejected', remarks: remarks }, { new: true });

        // Check if claim exists
        if (!claim) {
            return res.status(404).send({
                message: 'Claim not found'
            });
        }

        res.status(200).json({ message: 'Claim rejected successfully', claim });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
// const addRemark = async (req, res) => {
//     try {
//         const { _id, status, remarks } = req.body;

//         // Update claim status and remarks in the database
//         const claim = await claimModel.findByIdAndUpdate(_id, { status, remarks }, { new: true });

//         if (!claim) {
//             return res.status(404).json({ message: 'Claim not found' });
//         }

//         return res.status(200).json({ message: `Claim ${status}d successfully`, claim });
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


// module.exports = {postPolicy,deletepolicyController,listpolicyController,selectPolicy,claimPolicy};
module.exports = {listpolicyController,selectPolicy,userPolicyList,
                    claimPolicy,userClaimList,listClaimController,deletepolicyController,
                approveClaim,rejectClaim};
                //,addRemark