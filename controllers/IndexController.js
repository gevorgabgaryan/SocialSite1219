const { UserModel } = require("../models/UserModel");
let fs=require(`fs`);
let path=require(`path`);
const { PostModel } = require("../models/PostModel");

class IndexController{
    indexView(req,res){
        res.render('index');
    }
    async homeInfo(req,res){
        let user=await UserModel.findOne({_id:req.user.id}).select("image username");
        let posts=await PostModel.find().populate(`author`);
        
        let userInfo={
            id:req.user.id,
            username:user.username,
            image:user.image
        }
        
        res.json({userInfo, posts})
    }

   async profileView(req,res){
        let id=req.params.id;
        let profileInfo=await UserModel.findById(id);
        res.render(`profile`,{profileInfo})
    }

    //change profile photo

   async changePhoto(req,res){
       try{
        if(req.file){
           let user= await UserModel.findById(req.user.id).select(`image`); 
           let oldImageName=user.image
           user.image=req.file.filename;
           
           await user.save();
           res.json({imageName:req.file.filename});
           if(oldImageName!=="default.png"){
               fs.unlinkSync(path.join(__dirname,"..","/public/images/",oldImageName))
           }
        

        }else{
            res.json({error:`no attached file or ton sported type, please atach jpg, png`})
        }   
        

       }catch(err){
           console.log(err);
           res.json({error:err.message})
       }
    }  
}

module.exports=new IndexController()