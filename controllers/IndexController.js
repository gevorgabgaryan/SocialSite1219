
class IndexController{
    indexView(req,res){
        res.render('index');
    }
}

module.exports=new IndexController()