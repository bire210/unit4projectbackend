const express=require("express");
const { ProductModel }=require("../models/product.model")

const generalRouter=express.Router();
generalRouter.get("/",async(req,res)=>{
    try {
        const posts = await ProductModel.find();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.json("Somthing is wrong 11")
    }
})


generalRouter.get("/search",async(req,res)=>{
    
    let name=(req.query.name)
    try {
        const posts = await ProductModel.find({name:{$regex:name,$options:"i"}});
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.json("Somthing is wrong")
    }
})
  
generalRouter.get("/sort-price",async(req,res)=>{
    const name=req.query.price;

    if(name=="asc"){
        try {
            const posts = await ProductModel.find().sort({price:1});
            res.json(posts)
        } catch (error) {
            console.log(error)
            res.json("Somthing is wrong")
        }
        
    }else{
        try {
            const posts = await ProductModel.find().sort({price:-1});
            res.json(posts)
        } catch (error) {
            console.log(error)
            res.json("Somthing is wrong")
        }
    }
    
    
})

generalRouter.get("/sort-rating",async(req,res)=>{
    const name=req.query.rating;

    if(name=="asc"){
        try {
            const posts = await ProductModel.find().sort({rating:1});
            res.json(posts)
        } catch (error) {
            console.log(error)
            res.json("Somthing is wrong 72")
        }
        
    }else{
        try {
            const posts = await ProductModel.find().sort({rating:-1});
            res.json(posts)
        } catch (error) {
            console.log(error)
            res.json("Somthing is wrong 80")
        }
    }
    
    
})
generalRouter.get("/:id",async(req,res)=>{
    let id=req.params.id;
    try {
        const posts = await ProductModel.findOne({_id:id});
        res.send(posts)
    } catch (error) {
        console.log(error)
        res.json("Somthing is wrong 21")
    }
})



module.exports={generalRouter};