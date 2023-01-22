const express = require("express");
const { ProductModel } = require("../models/product.model")
const {UserModel}=require("../models/user.model");
const {oderProductModel}=require("../models/oreder.product.model")
const ProductRouter = express.Router();

ProductRouter.get("/", async (req, res) => {
    //veryfication need
    try {
        const posts = await ProductModel.find();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.json("Somthing is wrong")
    }
})
ProductRouter.get("/getuser", async (req, res) => {
    //veryfication need
    try {
        const posts = await UserModel.find();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.json("Somthing is wrong")
    }
})
ProductRouter.get("/getorderitem", async (req, res) => {
    //veryfication need
    try {
        const posts = await oderProductModel.find();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.json("Somthing is wrong")
    }
})


ProductRouter.post("/add", async (req, res) => {
    //veryfication need
    const post = req.body;
    console.log(post)
    try {
        const subpost = new ProductModel(post);
        await subpost.save();
        res.json("Product is added")
    } catch (error) {
        console.log(error);
        res.json("something is wrong");
    }
})

ProductRouter.patch("/update/:id", async (req, res) => {

    const post = await ProductModel.findOne({ "_id": req.params.id });
    const userID_in_note = post.userID;
    const userID_Making_re = req.body.userID;
    try {
        if (userID_in_note != userID_Making_re) {
            res.json("You are note Authorise user")
        } else {
            await ProductModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json("Updated");
        }

    } catch (error) {
        res.json("Something is wrong");
        console.log(error)
    }

})

ProductRouter.delete("/delete/:id", async (req, res) => {
    const post = await ProductModel.findOne({ "_id": req.params.id });
    const userID_in_note = post.userID;
    const userID_Making_re = req.body.userID;
    try {
        if (userID_in_note != userID_Making_re) {
            res.json("You are note Authorise user")
        } else {
            await ProductModel.findByIdAndDelete({ _id: req.params.id });
            res.json("Deleted");
        }

    } catch (error) {
        res.json("Something is wrong");
        console.log(error)
    }


})


module.exports = { ProductRouter }