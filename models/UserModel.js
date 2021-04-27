const {Schema,model}=require(`mongoose`);

let UserSchama=new Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
       
    },
    password:{
        type:String,
    }
})

let UserModel=model(`user`,UserSchama);

module.exports={
    UserModel
}