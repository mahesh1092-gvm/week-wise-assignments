import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
const {verify}=jwt;
config();

export const verifyToken= (...allowedRoles)=>{
    return (req,res,next)=>{
        try{
           //get token from cookie
           const token =req.cookies?.token;   // {token:asdad}
           // check token existed or not
           if(!token){
            return res.status(401).json({message:"please login first"})
           } 
           // validate token (decode the token)
           let decodedtoken=verify(token,process.env.SECRET_KEY);

           //check the role is same as role in decoded token
           if(!allowedRoles.includes(decodedtoken.role)){
            return res.status(403).json({message:"You are not autorized"})
           }
           // add decoded token
           req.user=decodedtoken;
           next();

        }catch(err){
            res.status(401).json({message:"Invalid token"})
        }
    }
}