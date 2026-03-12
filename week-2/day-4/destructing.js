//destructing(unpacking)
// let aa=[12,23]
// let[a,b]=aa;
// console.log(a,b)
let emp={
    eid:10,
    ename:"mahesh",
    address:{
        city:"hyd"
    }
}
let {eid,ename,address:{city}}=emp;
console.log(eid,ename,city)