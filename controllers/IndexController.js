const { UserModel } = require("../models/UserModel");

class IndexController{
    indexView(req,res){
        res.render('index');
    }
    async homeInfo(req,res){
        let user=await UserModel.findOne({_id:req.user.id}).select("image username");
        let userInfo={
            id:req.user.id,
            username:user.username,
            image:user.image
        }
        
        res.json({userInfo})
    }
}

module.exports=new IndexController()