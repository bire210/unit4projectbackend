const jwt=require("jsonwebtoken");
require('dotenv').config();
const userauthenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decode=jwt.verify(token,process.env.key);
        if(decode){
            const userID=decode.userID;
            req.body["userId"]=userID;
           //console.log(decode)
       next();
        }else{
            res.send("please login")
        }
    }else{
        res.send("please login")
    }
}

module.exports={userauthenticate}