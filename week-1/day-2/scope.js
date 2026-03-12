let a=10;// golbal scope
function test(){
    b=2; // func scope
    if(true){
        let c=30; // block scope
    }
}

//closure
let sum=function(x){
    return function(y){
        return x+y;
    }
}
let x=sum(10)
console.log(x(20))