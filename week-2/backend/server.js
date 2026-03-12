// create http server
import exp from 'express'
const app=exp()

//use body parser middleware
app.use(exp.json())

//set port number
const port=8074

//to assign port number to http server
app.listen(port,()=>console.log(`server listening po port ${port}...`))

//test data
let user=[]

//create api(rest api) --representational state transfer
//contains routess

//route to handle get req of client(http://localhost:8074/user)   // by default it is get
app.get('/user',(req,res)=>{
    //send res to client       // read all user and send response
    res.json({message:"this res for get user req data",payload:user})
})

app.get('/user/:id',(req,res)=>{
let idofurl=Number(req.params.id)
let index=user.find(users=>users.id==idofurl)
if(index==undefined){
        return res.json({message:"user  not there"})
    }
    res.json({message:"a user found",payload:index})
})
//route to handle post req of client
app.post('/user',(req,res)=>{
//send response to client      

              //get new   user from client
//console.log(req.body)
              //push user  into users
const newuser=req.body
user.push(newuser)
              //send req
res.json({message:"user created"})

//res.json({message:"this res for create user"})
})

// route to handle put req of client
app.put('/user',(req,res)=>{
    //get modify user  from client
    let modifieduser=req.body
    //get index of user in users array
    let index=user.findIndex(userobj=>userobj.id==modifieduser.id)
    if(index==-1){
        return res.json({message:"user not found"})
    }
    //update user with index
    user.splice(index,1,modifieduser)
    //send response
    res.json({message:"updated user"})
})
// route to handle delete req of client
app.delete('/user/:id',(req,res)=>{
    //get id of user from url parameter
let idofurl=Number(req.params.id)
    //find index of user
    let index=user.findIndex(users=>users.id==idofurl)
    //if index not found
    if(index==-1){
        return res.json({message:"user not found to delete"})
    }
    // delete user by index
    user.splice(index,1)
    //send res
    res.json({message:" user deleted"})
})







//test product 
let product=[]

//route to handle get req of product(http://localhost:6301/product)
//read all products
app.get('/product',(req,res)=>{
    //send req to product
    res.json({message:"this is to read products",payload:product})
})

//read all products by brand
app.get('/product/:brand',(req,res)=>{
    let brandname=(req.params.brand)
    let index=product.find(products=>products.brand==brandname)
    if(index==undefined){
        return res.json({message:"product not found"})
    }
    res.json({message:"product found",payload:index})
})

// create a product
app.post('/product',(req,res)=>{
   const newproduct=req.body
    product.push(newproduct)
    res.json({message:"product created"})
})

//update a product
app.put('/product',(req,res)=>{
    let modifiedproduct=req.body
    let index=product.findIndex(products=>products.productid==modifiedproduct.productid)
    if(index==-1){
        return res.json({message:"product not found"})
    }
    product.splice(index,1,modifiedproduct)
    res.json({message:"product updated"})
})

// delete a product by id
app.delete('/product/:productid',(req,res)=>{
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
