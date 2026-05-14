const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];
//1)filtering students whose marks >= 40
const passed=students.filter((element)=>element.marks>=40)
console.log(passed)

//2. map() to add a grade field
// ≥90 → A
// ≥75 → B
// ≥60 → C
// else → D
const grades=students.map((element)=>{
  if(element.marks>=90){
    element.grade="A"
  }
  else if(element.marks>=75 && element.marks<90){
    element.grade="B"
  }
  else if(element.grade>=60 && element.grade<75){
    element.grade="C"
  }
  else{
    element.grade="D"
  }
  return element
})
console.log(grades)

//3)reduce() to calculate average marks
const sum=students.reduce((accumulator,element)=>accumulator+element.marks,0)
console.log(sum/students.length)

// 4. find() the student who scored 92 -> since there are no marks greater than 92 it return undefined
let marksGreaterThan92Array=[]
const findGreater_92=students.find((markgreater92)=>{
  if(markgreater92.marks>92){
    marksGreaterThan92Array.push(markgreater92)
    return marksGreaterThan92Array
  }
})
console.log(findGreater_92)

//   5. findIndex() of student "Kiran"
const findKiranIndex=students.findIndex((kiranIndex)=>kiranIndex.name=="Kiran")
console.log(findKiranIndex)