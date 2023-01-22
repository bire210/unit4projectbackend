
const express=require("express");
const { AdminModel } = require("../models/admin.model")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

const AdminRouter=express.Router();

AdminRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const data = await AdminModel.find({ email });
        if(data.length>0){
              res.json("Already registered Sign in please")
              console.log("Already registered Sign in please")
        }else{
            bcrypt.hash(password, 5, async (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    console.log(err)
                } else {
                    const user = new AdminModel({ name, email, password: hash });
                    await user.save();
                    res.json("Registeration is done");
                    console.log("Registeration is done");
                }
            });
        }

    } catch (error) {
        console.log(error);
    }


})
AdminRouter.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    try {
        const data = await AdminModel.find({ email });
        const has_pass = data[0].password;
       console.log(data)
        if (data.length > 0) {
            bcrypt.compare(password, has_pass, (err, result) => {
                // result == false
                if (result) {
                    const token = jwt.sign({ userID: data[0]._id },process.env.key);
                  
                    res.json({ "msg": "login sucess", "token": token });
                    
                } else {
                    res.json("Wrong Credentials")
                }
            });

        } else {
            res.json("Wrong Credentials");
           
        }
    } catch (error) {
        console.log(error)
    }


})


module.exports={AdminRouter}