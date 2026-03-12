//function receive arguments called parameter
function findsum(...a){
    console.log(a)
 let sum=a.reduce((acc,ele)=>acc+ele)
 console.log(sum)
}
findsum(10,20,30)

