const userModel = require("../models/userModel")
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')

// Defined admin credentials manually

const adminData = [{
    adminEmail :"admin@admin.com",
    adminPassword :"adminin"
}];


const registerController = async(req,res)=>{
    try{
        const existingUser= await userModel.findOne({
            email: req.body.email
        })
        if(existingUser){
            return res.status(200).send({
                success:false,
                message: 'User already exists'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(req.body.password,salt)
        req.body.password = hashedPassword
        //res data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success:true,
            message: 'User Registered Successfully!',
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in register API',
            error
        })
    }

}

//login call back
const loginController =async (req,res) =>{
    
    try{
        const { email, password, role } = req.body;
        
        // Check if provided credentials match admin credentials
        const isAdmin = adminData.find(admin => admin.adminEmail === email && admin.adminPassword === password);
        
        if (isAdmin) {
            return res.status(200).send({
                success: true,
                message: "Admin login Successfully!",
                isAdmin:true,
                role:'admin'
            });
        }
        

        else{
            
            const user=await userModel.findOne({email})
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:'Invalid Credentials'
                })
        }
        //compare
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:'Invalid Credentials'
            })
        }
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.status(200).send({
            success:true,
            message:'Login Successfully!',
            isAdmin: false,
            token,
            role: 'user',
            user
        })
    }
}

    catch(error){
        console.log("eee");
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login API',
            error
        })
    }

};

//get current user
// const currentUserController = async(req,res)=>{
//     try{
//         const user = await userModel.findOne({_id:req.body.userId})
//         return res.status(200).send({
//             success:true,
//             message:'User fetched successfully!',
//             user
//         })

//     }catch(error){
//         console.log(error)
//         return res.status(500).send({
//             success:false,
//             message:'Unable to get current user',
//             error
//         })
//     }
// }
module.exports = {registerController,loginController}