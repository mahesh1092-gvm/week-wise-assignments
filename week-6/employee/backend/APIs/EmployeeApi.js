//creating mini express
import exp from "express"
export const empapp=exp.Router()
import { employeeModel } from "../models/employeeModel.js"

// create employee
empapp.post("/employees",async (req,res)=>{
    const newemp=req.body
    const newEmployeeDocument=new employeeModel(newemp)
    const result=await newEmployeeDocument.save()
    console.log(result);
    res.status(201).json({message:"employee created"})
})

//read all employees
empapp.get("/employees",async(req,res)=>{
    const emplist=await employeeModel.find()
    res.status(200).json({message:"employees", payload:emplist})
})

//update empolyee
empapp.put("/employees/:id",async(req,res)=>{
    const modifiedemp=req.body
    const eid=req.params.id
    // find user by id and update
    const updateemp=await employeeModel.findByIdAndUpdate(eid,{$set:{...modifiedemp}},{new:true, runValidators:true})
    //send res
    res.status(200).json({message:"emp modified",payload:updateemp})
})

//del employe
empapp.delete("/employees/:id",async(req,res)=>{
    // get id from req
    const eid=req.params.id

    const deleteemp=await employeeModel.findByIdAndDelete(eid)
    if(!deleteemp){
        return res.status(404).json({message:"emp not found to delete"})
    }
    //send res
    res.status(200).json({message:"emp deleted"})
})