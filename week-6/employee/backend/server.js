import exp from "express"
import { connect } from "mongoose";
import { config } from "dotenv"
import { empapp } from "./APIs/EmployeeApi.js";
import cors from 'cors';
const app=exp() // to start the server
config();

app.use(cors({
  origin:["http://localhost:5173"],
}),
);
app.use(exp.json())
app.use("/employee-api",empapp)

const port=process.env.PORT || 8074
app.listen(8074,()=>console.log("server on port 8074..."))




//connect to db server
async function connectdb(){
    try{
        await connect(process.env.DB_URL);
        console.log("db connection success")
    } catch (err){
        console.log("err in db connection:",err.message);
    }
}
connectdb()

//error handling middleware
app.use((err,req,res,next)=>{
  console.log("err in middleware:",err.message)
  //  res.json({message:"error occured",error:err.message})
 // if(err.name=="ValidationError"){
   // return res.status(400).json({message:"error occured",error:err.message})
 // }
  //cast error
  // if(err.name=="CastError"){
  //   return res.status(400).json({message:"error occured",error:err.message})
  // }
  //send server side error
  res.status(err.status || 500).json({message:"error occured",reason:err.message})
})