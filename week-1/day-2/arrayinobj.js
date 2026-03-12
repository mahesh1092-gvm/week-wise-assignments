let student={
    rno:1,
    fname:"mahesh",
    lname:"gajji",
    marks:[56,76,34,57],
    address:{
        city:"hyd",
        pin:564,
    },
    getFullName: function(){ //method but not func
        return this.fname+this.lname
    },
    avgMarks: function(){
 let sum=0,n=0;
 for(let i in this.marks){
    sum=sum+this.marks[i]   
 }
 return sum/this.marks.length
    },
}
console.log(student.getFullName())
console.log(student.avgMarks())