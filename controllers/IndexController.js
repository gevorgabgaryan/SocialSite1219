
class IndexController{
    indexView(req,res){
        res.render('index');
    }
    homeInfo(req,res){
        console.log(7, req.user)
        res.json({userInfo:req.user})
    }
}

module.exports=new IndexController()