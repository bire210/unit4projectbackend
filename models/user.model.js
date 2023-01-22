const mongoose=require("mongoose");

const userSchma=mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,
    password:String,
})

const UserModel=mongoose.model("user",userSchma);
module.exports={
    UserModel
}