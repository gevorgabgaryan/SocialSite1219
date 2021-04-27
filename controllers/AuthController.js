const { UserModel } = require("../models/UserModel");
const bcrypt=require(`bcryptjs`)

class AuthController{



   async  registerNewUser(req,res){
    try{
       //coding with algoritm
       let hashPassword=bcrypt.hashSync(req.body.password);
       let newUser=new UserModel({
           username:req.body.username,
           email:req.body.email,
           password:hashPassword,
       })
       let savedUser=await newUser.save();
       res.json({info:savedUser})
        
     }catch(err){
        console.log(21,err)
        res.json({error:err.message})
     }     
    }


   
}

module.exports=new AuthController()