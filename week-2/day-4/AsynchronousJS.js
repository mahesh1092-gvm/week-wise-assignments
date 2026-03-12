//timer
// setTimeout(()=>{
//     console.log("hello")
// },9000)
// console.log("oye")

// setInterval(()=>{
//     console.log("time ")
// },2000)

//promise
// call you in 5sec
console.log("call you in 5sec")
let futcond=false;
// promise producer(create promise)
const promiseobj=new Promise((fulfilled,rejected)=>{               // a is fulfilled , b is rejected
    // fulfilled("promise fulfilled")
    // rejected("promise rejected")
    setTimeout(()=>{
    if(futcond==true){
    fulfilled("haii")
    }else{
        rejected("sorry")
    }
    },5000)
})
//console.log(promiseobj)
//promise consumer
promiseobj
.then((message)=>console.log("mesage is then:",message))
.catch((errorMessage)=>console.log("error is:",errorMessage))