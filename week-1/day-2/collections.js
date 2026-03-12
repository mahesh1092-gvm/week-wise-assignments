// collections
//array-pack of elements

let marks=[40,65,24,57]
let name=["mahi","sanju","venky"]
//console.log(marks[9])// gives undefined but not exception
//console.log(marks[1])// gives 65
//iteration (for-of-loop
for(let k of marks){// not used for element level access
    console.log(k)
}


//object-pack of properties
let student={
    sno:30,
    sname:"mahesh",
    rno:"24eg105m30"
}
console.log(student.sno,student.sname,student.rno)// for each  // if element not there returns undefined
console.log(student)// for total
// iterate an object (for in loopfor)
for(let v in student){
//    console.log(v)// we get keys
//   console.log(student[v]) // we gwt values
console.log(`${v} is ${student[v]}`)
}



