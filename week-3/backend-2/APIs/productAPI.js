// creating mini express
import exp from "express"
export const productapp=exp.Router()
import {productModel} from '../models/productModel.js'

// defining product rest api routes
//a. create a product
productapp.post("/products", async(req,res)=>{
    // get new product from req
    const newproduct=req.body
    // create new product document
const newproductdocument=new productModel(newproduct)
    //save
    const result=await newproductdocument.save()
    console.log(result)
    //send res
    res.status(201).json({message:"product created"});
});


//b.read all products
productapp.get("/products",verifytoken,async(req,res)=>{
    //read all products from db
    let productlist=await productModel.find();
    //send res
    res.status(200).json({message:"products",payload:productlist})
});

//c.read a product by product id
   productapp.get("/products/:productid",verifytoken,async(req,res)=>{
     // read product id from req params
const pid=req.params.productid
    // find product by id
    const productobj=await productModel.findById(pid)
     // if product not found
     if(!productobj){
        return res.status(404).json({message:"product not found"})
     }
     // send res
     res.status(200).json({message:"product",payload:productobj})
   })
     
//d.update a product by product id
productapp.put("/products/:productid",verifytoken,async(req,res)=>{
 // get modified product from req
 const modifiedproduct=req.body
 const pid=Number(req.params.productid)
 // find product by id and update
 const updateproduct=await productModel.findByIdAndUpdate(pid,{$set:{...modifiedproduct}},{new:true,runValidators:true})
 //send res
res.status(200).json({message:"product modified",payload:updateproduct})
})

//e.delete a product by product id
productapp.delete("/products/:productid",verifytoken,async(req,res)=>{
    //get id from req
    const pid=req.params.productid
    //find product by id and delete
    const deleteproduct=await productModel.findByIdAndDelete(pid)
    //if product not found
    if(!deleteproduct){
        return res.status(404).json({message:"product not foundvto delete"})
    }
    //send res
    res.status(200).json({message:"product deleted"})
})