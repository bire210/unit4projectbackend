const mongoose=require("mongoose");

const productSchma=mongoose.Schema({
    name:String,
    image:String,
    description:String,
    price:Number,
    rating:Number,
   userId:String
})

const oderProductModel=mongoose.model("oderProduct",productSchma);
module.exports={
    oderProductModel
}
//product model for oder