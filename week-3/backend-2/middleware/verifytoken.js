import jwt from "jsonwebtoken"
const {verify}=jwt;

export function verifytoken(req,res,next){
    //token verification logic
    const token=req.cookies?.token
    // if req from unauthorized user
    if(!token){
        return res.status(401).json({message:"plz login"})
    }
    
    try{
        // if token is existed
    const decodedtoken=verify(token,"abcde");
    console.log(decodedtoken)
    req.user=decodedtoken
    //call next
    next();
    }catch(err){
        res.status(401).json({message:"session expired..plz login again"})
    }
}