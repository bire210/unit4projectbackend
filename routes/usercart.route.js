const express = require("express");
const { oderProductModel } = require("../models/oreder.product.model")

const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
    //veryfication need
    try {
        const posts = await oderProductModel.find();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.json("Somthing is wrong")
    }
})


orderRouter.post("/addcart", async (req, res) => {
    //veryfication need
    const post = req.body;
    console.log(post)
    try {
        const subpost = new oderProductModel(post);
        await subpost.save();
        res.json("Product is added in cart")
    } catch (error) {
        console.log(error);
        res.json("something is wrong");
    }
})


orderRouter.delete("/deletecart/:id", async (req, res) => {
    const post = await oderProductModel.findOne({ "_id": req.params.id });
    const userID_in_note = post.userID;
    const userID_Making_re = req.body.userID;
    try {
        if (userID_in_note != userID_Making_re) {
            res.json("You are note Authorise user")
        } else {
            await oderProductModel.findByIdAndDelete({ _id: req.params.id });
            res.json("Deleted");
        }

    } catch (error) {
        res.json("Something is wrong");
        console.log(error)
    }


})


module.exports = { orderRouter }