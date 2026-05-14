//6.write a function that recieves an array as arg and return their sum.
let sum=0;
function array_func(a){
  for(let i=0; i<a.length; i++){
    sum+=a[i];
  }
  return sum;
  
}
let array=[1,2,3,4,5];
array_func(array);
console.log(sum)
