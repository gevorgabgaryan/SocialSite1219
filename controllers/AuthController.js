const { UserModel } = require("../models/UserModel");
const bcrypt=require(`bcryptjs`);
const jwt=require(`jsonwebtoken`);
require(`dotenv`).config()

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

      //login
      async loginUser(req,res){
        try{
         let email=req.body.email;
         let user= await UserModel.findOne({email:email});

         //user is null not founded
         if(!user){
           return  res.json({error:`Invalid Email or Password`}) 
         } 

         //if founded

         let okPassword=bcrypt.compareSync(req.body.password,user.password);

         if(!okPassword){
            return  res.json({error:`Invalid Email or Password`}) 
         }

        //create token
        let payload={
            id:user._id,
            username:user.username,
            email:user.email,
        }

        jwt.sign(payload,process.env.jwtSecret,{expiresIn:"1d" },(err,token)=>{
            if(err){
              return res.json({error:err.massege}) 
            }
         
            res.json({user, token})
        })
         

        }catch(err){
            res.json({error:err.massege}) 
        }
        
    }


   
}

module.exports=new AuthController()