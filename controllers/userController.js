const bcrypt=require('bcrypt');
const userModel =require("../models/userModel");
const JWT=require("jsonwebtoken");



exports.RegiterController=async(req,res)=>{
     try {    
            console.log(req.body)
           const {email,password,username,dob}=req.body;
        //    console.log("from register route",username,email,password,dateofbirth)
           const existUser=await userModel.findOne({email});
           if(existUser){
            return res.status(200).json({
                success:false,
                message:"User Already Exist",
            })
           }
           const hashPassword=await bcrypt.hash(password,10);
            
           const user=await userModel({username,email,password:hashPassword,dateofbirth:dob}).save();

           return res.status(201).json({
            success:true,
            message:"User Registered Successfully !",
            user,
           })

 
        
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Opps! Something went wrong",
            error:error.message
        })
        
     }
}

exports.LoginController=async(req,res)=>{
     
    try { 
               console.log(req.body)

            const { username,password }=req.body; 
              const userFound=await userModel.findOne({username});
              
              if(!userFound){
                 return res.status(200).json({
                    message:" User does't exist",
                    success:false,
                 })
              }
            //   console.log( "checking database password", userFound.password)
           const comparePassword=await bcrypt.compare(password,userFound.password)
            
             if(!comparePassword){
                return res.status(200).json({
                    success:false,
                    message:"password does not matched "
                   })
             }
    
            
            const token= await JWT.sign({userId:userFound._id},process.env.SECRET_KEY,{expiresIn:'7days'});
            // const token=JWT.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1days'} )

            console.log("token is " ,token);


        return res.status(200).json({
              success:true,
                username:userFound.username,
                email:userFound.email,
                
              token
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Login failed ,Something went wrong',
            error:error.message
        })
        
    }
}


/**********have to fetch all users**************************************** */

exports.UserProfileController=async(req,res)=>{  
    try {     

             const user=await userModel.find().select("-password");
                console.log(user);
                
        res.status(200).json({
            message:"All Users ",
            success:true,
        
            user
        })
        
    } catch (error) {
         res.status(500).json({
            error:error.message,
            success:false,
         })
    }
}