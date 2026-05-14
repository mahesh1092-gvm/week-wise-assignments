let employees = [
  {
    eno: 101,
    name: "Ravi",
    marks: [78, 82, 91],
  },
  {
    eno: 102,
    name: "Bhanu",
    marks: [65, 70, 68],
  },
  {
    eno: 103,
    name: "Sneha",
    marks: [88, 92, 95],
  },
  {
    eno: 104,
    name: "Kiran",
    marks: [55, 60, 58],
  },
  {
    eno: 105,
    name: "Anitha",
    marks: [90, 85, 87],
  },
];
//console.log(employees)

employees.splice(1,0,{
  eno: 111,
  name: "Sanju",
  marks: [90,89,87]
})
// console.log(employees)
let i,j;
for(let x in employees){
  if(employees[x].name=="Kiran"){
    i=x
  }
}
// employees.splice(i,1)
// console.log(employees)
for(let x in employees){
  if(employees[x].name=="Sneha"){
    j=x
  }
}
let k,m
for(k in employees[j].marks){
  if(employees[j].marks[k]==95){
  m=k
}
}

employees[j].marks.splice(m,1,75)//j'th object's m'th marks(95) index
console.log(employees)