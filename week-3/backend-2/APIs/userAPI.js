//create mini express
import exp from 'express'
export const userapp=exp.Router()
import { userModel } from '../models/UserModel.js';
import {hash,compare} from 'bcryptjs';
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
import { verifytoken } from '../middleware/verifytoken.js';
const {sign}=jwt
// define user rest api routes
// create new user
userapp.post("/users",verifytoken,async(req,res)=>{
    //get new user obj from req
    const newuser=req.body;
    //hash the password
    const hashpassword=await hash(newuser.password,10)
    //replace plain password with hashed password
    newuser.password=hashpassword
    // create new user document
    const newuserdocument=new userModel(newuser)
    // save
   const result= await newuserdocument.save()
   console.log(result)
    //send rees
    res.status(201).json({message:"user created"});
});

//user login
userapp.post("/auth",async(req,res)=>{
    // get user cred obj from client
    const {email,password}=req.body
    // verify email
    let user=await userModel.findOne({email:email})
    //if email not existed
    if(!user){
        return res.status(400).json({message:"incorrect email"})
    }
    //compare passwords
    let result =await compare(password,user.password)
    // if password not matched
    if(!result){
        return res.status(400).json({message:"incorrect password"})
    }
    //if passwords are matched
    //create token (jsonwebtoken-jwt)
    const signedtoken=sign({email:user.email},process.env.SECRET_KEY,{expiresIn:"1h"})
              // //send token in res
              // res.status(200).json({message:"login success",token:signedtoken})
    //store token as httponly cookie
    res.cookie("token",signedtoken,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    //send res
    res.status(200).json({message:"login success",payload:user})
})

// read all users (making protected)
userapp.get("/users",verifytoken,async(req,res)=>{
    //read all users from db
    let userlist=await userModel.find();
    // send res
    res.status(200).json({message:"users",payload:userlist})
})

// read a user by id
userapp.get("/user",verifytoken,async(req,res)=>{

    //read user email from req
    const emailofuser=req.user?.email;
    //console.log(emailofuser)
    //find user by email
    const userobj=await userModel.findOne({email:emailofuser}).populate("cart.product")  //use findone method to read a document with non obj id fields
   // if user not found                                       //if it has reference ..then add populate method as extension
   if(!userobj){
    return res.status(404).json({message:"user not found"})
   }
    // send res                                 // use findbyid to read doc with obj id
    res.status(200).json({message:"user",payload:userobj})
})
// update user by id
userapp.put("/users/:id",verifytoken,async(req,res)=>{
    // get modified user from req
    const modifieduser=req.body
    const uid=req.params.id
    // find user by id and update
    const updateuser=await userModel.findByIdAndUpdate(uid,{$set:{...modifieduser}},{new:true, runValidators:true})
    //send res
    res.status(200).json({message:"user modified",payload:updateuser})
});
// delete by id
userapp.delete("/users/:id",verifytoken,async(req,res)=>{
    // get id from req
    const uid=req.params.id
    // find user by id and delete
    const deleteuser=await userModel.findByIdAndDelete(uid)
    if(!deleteuser){
        return res.status(404).json({message:"user not found to delete"})
    }
    //send res
    res.status(200).json({message:"user deleted"})
})

//add product to cart
userapp.put("/cart/product-id/:pid",verifytoken,async(req,res)=>{
    //get product id from url param
    let productId=req.params.pid;
    //get current user details
    const emailOfUser=req.user?.email
    // //get user from db
    // const user=await userModel.findOne({email:emailOfUser})
    // //if user is invalid
    // if(!user){
    //     return res.status(404).json({message:"user not found"})
    // }

    //add products to cart
    // before add, first it should check that product is already in the cart ...
    // if it is there increment by 1 otherwise add that product to cart
    
    let result=await userModel.findOneAndUpdate({email:emailOfUser},{$push:{cart:{product:productId}}})
    // console.log(result)
    if(!result){
        return res.status(404).json ({message:"user  not found"})
    }
    res.status(200).json({message:"product added to cart"})

})

