const express =require("express");
const {connection}=require("./config/db")
const {AdminRouter}=require("./routes/admin.route");
const { ProductRouter }=require("./routes/product.route");
const {admiauthenticate}=require("./midleware/admin.authenticate.midleware");
const {userauthenticate}=require("./midleware/user.authenticate")
const {UserRouter}=require("./routes/user.route")
const {generalRouter}=require("./routes/genral.route");
const { orderRouter }=require("./routes/usercart.route")
require('dotenv').config();
const cors=require("cors");
const { get } = require("mongoose");

const app=express();
app.use(express.json());
app.use(cors({origin:"*"}))
app.get("/",(req,res)=>{
    res.send("this is home page")
})
app.use("/admin",AdminRouter)
app.use("/general",generalRouter);
app.use("/admintask",admiauthenticate,ProductRouter)
app.use("/user",UserRouter);
app.use("/usercart",userauthenticate,orderRouter)

app.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log("data base is connected")
    } catch (error) {
        console.log("Database is not connected")
        console.console.log(error);
    }
    console.log(`server is running over ${process.env.port}`)
})