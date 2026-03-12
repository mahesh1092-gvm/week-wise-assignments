//create mini-express app(seperate route)
import exp from 'express'
export const userapp=exp.Router()


//test data
let user=[]

//create api(rest api) --representational state transfer
//contains routess

//route to handle get req of client(http://localhost:8074/user)   // by default it is get
userapp.get('/user',(req,res)=>{
    //send res to client       // read all user and send response
    res.json({message:"this res for get user req data",payload:user})
})

userapp.get('/user/:id',(req,res)=>{
let idofurl=Number(req.params.id)
let index=user.find(users=>users.id==idofurl)
if(index==undefined){
        return res.json({message:"user  not there"})
    }
    res.json({message:"a user found",payload:index})
})
//route to handle post req of client
userapp.post('/user',(req,res)=>{
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
userapp.put('/user',(req,res)=>{
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
userapp.delete('/user/:id',(req,res)=>{
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

