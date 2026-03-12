console.log("will send money after a 5min")
let futcond=true;
// promise producer
let promiseobj=new Promise((fulfiled,rejected)=>{
setTimeout(()=>{
    if(futcond==true){
        fulfiled("am paying ")
    }else{
        rejected("am unable to pay")
    }
},3000)
})
// promise consumer
promiseobj
.then((message)=>console.log("message is:",message))
.catch((errorMessage)=>console.log("error is:",errorMessage))