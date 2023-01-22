const mongoose=require("mongoose");

const adminSchma=mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const AdminModel=mongoose.model("admin",adminSchma);
module.exports={
    AdminModel
}
//product model for admin