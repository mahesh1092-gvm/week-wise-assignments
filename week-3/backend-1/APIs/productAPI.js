// create mini express
import exp from 'express'
export const productapp=exp.Router()

//test product 
let product=[]

//route to handle get req of product(http://localhost:6301/product)
//read all products
productapp.get('/product',(req,res)=>{
    //send req to product
    res.json({message:"this is to read products",payload:product})
})

//read all products by brand
productapp.get('/product/:brand',(req,res)=>{
    let brandname=(req.params.brand)
    let index=product.find(products=>products.brand==brandname)
    if(index==undefined){
        return res.json({message:"product not found"})
    }
    res.json({message:"product found",payload:index})
})

// create a product
productapp.post('/product',(req,res)=>{
   const newproduct=req.body
    product.push(newproduct)
    res.json({message:"product created"})
})

//update a product
productapp.put('/product',(req,res)=>{
    let modifiedproduct=req.body
    let index=product.findIndex(products=>products.productid==modifiedproduct.productid)
    if(index==-1){
        return res.json({message:"product not found"})
    }
    product.splice(index,1,modifiedproduct)
    res.json({message:"product updated"})
})

// delete a product by id
productapp.delete('/product/:productid',(req,res)=>{
    let productid=Number(req.params.productid)
    let index=product.findIndex(products=>products.productid==productid)
if(index==-1){
    return res.json({message:"product not found to delete"})
}
product.splice(index,1)
res.json({message:"product deleted"})
})



// create product api with below operations
//create new product ({productid,name,brand,price})
//read all products
//read all products by brand
// update a product
// delete a product by id
