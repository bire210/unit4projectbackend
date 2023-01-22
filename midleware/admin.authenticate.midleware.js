const jwt=require("jsonwebtoken");
require('dotenv').config();
const admiauthenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decode=jwt.verify(token,process.env.key);
        if(decode){
            const userID=decode.userID;
            req.body["userID"]=userID;
           //console.log(decode)
       next();
        }else{
            res.send("please login")
        }
    }else{
        res.send("please login")
    }
}

module.exports={admiauthenticate}