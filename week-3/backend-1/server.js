// create http server
import exp from 'express'
const app=exp()
import {userapp} from './APIs/userAPI.js'
import {productapp} from './APIs/productAPI.js'

//use body parser middleware  (in-built)
app.use(exp.json())

// create custom middleware
function middleware1(req,res,next){
    //send res from middleware
    //res.json{message:"this is middleware1"}
    //farward req to next
    console.log("middleware 1 executed")
    next();
}
function middleware2(req,res,next){
    //send res from middleware
    //res.json{message:"this is middleware1"}
    //farward req to next
    console.log("middleware 2 executed")
    next();
}
app.use(middleware1)
app.use(middleware2)

// farward req to userapi if path starts with /user-api
app.use('/user-api',userapp)

// farward req to userapi if path starts with /product-api
app.use('/product-api',productapp)
//set port number
const port=8074

//to assign port number to http server
app.listen(port,()=>console.log(`server listening po port ${port}...`))

