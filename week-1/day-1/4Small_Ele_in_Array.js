// 4.find smallest in the array.
let marks=[90, 78, 65, 98];
let s=marks[0];
for(let i=0; i<marks.length; i++){
  if(s>marks[i]){
    let temp=s;
    s=marks[i];
    marks[i]=temp;
  }
}
console.log(s);