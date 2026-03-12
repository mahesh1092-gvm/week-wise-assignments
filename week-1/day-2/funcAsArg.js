let test=function(a){ // function that passed as a argumnent for function
    console.log("hello")
}

test(function(){
    console.log("mahesh")
})

//PaymentAddress
let makepayment=function(amount,paytype){
    console.log(`payment of ${amount} is started`)
    paytype()
}
let upi=function(){
    console.log("done with upi")
}
let card=function(){
    console.log("done with card")
}
makepayment(1000,upi)