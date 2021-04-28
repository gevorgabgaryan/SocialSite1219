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
    },
    image:{
        type:String,
        default:"default.png"
    }
})

let UserModel=model(`user`,UserSchama);

module.exports={
    UserModel
}