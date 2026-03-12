//obj stored in heap
// data variables methods constructor statics ---data we take in class called instance class
//methods are not belong to objects ----method contains logic//object contains instance data
// static -AU
//ovject holds insttance variable
// in js we can create objects without classes

//object literals
// const Test={
//     a:10  ,                     //data
//     getData:function() {      // we can have methods allso

//     }
// }

//when we want to crate multiple objects same time ...we use classes
//let person={}
//let stu={}   // create 20 objects    let student1={ name,age...}   let student2={}.....code size increases
   
// create 20 objects  
class Student{
    //properties
    #sno;  // #sno  become pvt
    sname;
    email;//by default it has undefined
    //constructors  
constructor(sno,name,email){
 //---initializing the object
 this.#sno=sno;
 this.sname=name;
 this.email=email;
}
    //methods
    getStudentName(){
        return this.sname;
    }
}
//creating the object 
let st1=new Student(30,"mahesh","M@gmail.com") //not class it is constructor
let st2=new Student(31,"mahi","v@gmail.com")
console.log(st1.getStudentName())
console.log(st1.sname)
console.log(st2.sno)