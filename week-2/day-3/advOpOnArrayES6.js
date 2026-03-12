// passing functions as arguments called callback function
// function test{
// return 100
// }
// test()   called by line 5
// original array is affected by using push,pop,shift,unshift,splice methods
// but here it stores in new array
//method is inside of class

// function
let testdata=[50,39,-79,37,68,55]

// 1.filter ----it means selection ....to select some elements ......it dont do modification
// let result=[]
// for(let v in testdata)
let r=testdata.filter( (Element) => Element>30); // first element 2nd index(2nd parameter)
console.log(r)
// get elements blw 40 and 80
let k=testdata.filter( (get) => get>40 && get<80);
console.log(k)

//2.map --- it is used for modification but not for selection(it gives boolean if we used selection )
// let r=testdata.map( (Element) => Element>30);
// console.log(r)
// add 10 for each element
let m=testdata.map( (Element) => Element+10)
console.log(m)
// add 10 if ele <50 and sub 20 if ele>50
const m1=testdata.map( Element =>{
    if(Element<50){
        return Element+10
    }
    else{
        return Element-20
    }
})
console.log(m1)

// 3.reduce ---an array reduced to single value // it need 2 parameters(accumulator,element)
//map is used to pick individual property
// find sum of elements
const m2sum=testdata.reduce((accumulator,Element)=>accumulator+Element)
//                           59        39            98
//                           98        -79           19  in this way
console.log(m2sum)
// find small element

const small=testdata.reduce((accumulator,Element)=>{
    if(accumulator<Element)
        Element=accumulator
        return Element
})
console.log(small)
// const small=testdata.reduce((acc,Element)=>acc<element?acc:element)
//console.log(small)
// find big
const big=testdata.reduce((accumulator,Element)=>{
    if(accumulator>Element)
        Element=accumulator
        return Element
})
console.log(big)
///4.findcls

// returns undefined if element not there in array.....if there it returns element
let m3=testdata.find(Element=>Element==90)
console.log(m3)

// 5.findindex
// returns -1 if element not there in array.....if there it returns element
let m4=testdata.findIndex(Element=>Element==90)
console.log(m4)

//6.sort --- it modifes the original array here....not create new array
let data=[6,8,4,19,3] // if 19 there it div 1 and 9 .....so 19 comes 1st
//let newArray=data.sort()
let newArray=data.sort((a,b)=>a-b) // for asc a-b.....for des b-a
console.log(newArray)

//7.tosorted 
let datas=[6,8,4,19,3]
let newArrays=datas.toSorted((a,b)=>a-b) // for asc a-b.....for des b-a
console.log(newArrays)
