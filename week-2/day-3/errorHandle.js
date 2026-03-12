// what is error
//console.log(a)// a is not defined(ref error)
//creatingg error
// const err=new Error("new error");
// console.log(err.name)//error
// console.log(err.message)//display msg
// console.log(err.stack) // error:new error
// console.log("first")
// console.log(a)
// console.log("second") // prints first and give error
//handling errors
console.log("first")
try{           //block
console.log(a)
}            
catch(err){       // method
console.log(err.message)// to explain about the error occured
}
console.log("second")
// finally{

// }  