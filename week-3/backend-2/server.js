//create express app
import exp from 'express'
import cookieParser from 'cookie-parser'
import {connect} from 'mongoose'
import {userapp} from "./APIs/userAPI.js"
import {config} from 'dotenv'
config(); //process.env.PORT,process.env.DB_URL
const app=exp()
// start server
const port=process.env.PORT || 8074
app.listen(8074,()=>console.log("server on port 8074.."))


// farward req to userapi if path starts with /user-api
app.use(exp.json())
app.use(cookieParser())
app.use("/user-api",userapp)
//connect to db server
async function connectdb(){
    try{
        await connect(process.env.DB_URL);
        console.log("db connection success")
    } catch (err){
        console.log("err in db connection:",err);
    }
}
connectdb()

//error handling middleware
app.use((err,req,res,next)=>{
  //  res.json({message:"error occured",error:err.message})
  if(err.name=="ValidationError"){
    return res.status(400).json({message:"error occured",error:err.message})
  }
  //cast error
  if(err.name=="CastError"){
    return res.status(400).json({message:"error occured",error:err.message})
  }
  //send server side error
  res.status(500).json({message:"error occured",error:"server side error"})
})




//  async function getdata(){
// try{
//     let res=await fetch("jdfsgbdshgkjdshfkjdsd")
//     let data = await res.json()
//     console.log(data) 
//} catch(err){
// console.log(err)
// }
// getdata()

// for product 
import { productapp } from './APIs/productAPI.js'
app.use("/product-api",productapp)