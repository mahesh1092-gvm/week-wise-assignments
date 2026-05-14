// 7.write a function that recieves an array & search element as args and 
//   return the index of that search element in the array. It should return
//   "not found" when search element is not found.
let array=[1,2,3,4,5];
isfound=false;
function search(a,s){
  for(let i=0; i<a.length; i++){
    if(s==a[i]){
      isfound=true;
      if(isfound){
        index=i;
      }
    }
  }
  if(isfound){
    return index
  }
  else{
    return "not found"
  }
}
console.log(search(array,3))