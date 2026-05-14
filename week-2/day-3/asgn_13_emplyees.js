const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

//1. filter() employees from IT department
const filterIt=employees.filter((itDept)=>itDept.department=="IT")
console.log(filterIt)

//2. map() to add: netSalary = salary + 10% bonus
const addNetSalary=employees.map((increment)=>increment.salary+0.1*increment.salary)
console.log(addNetSalary)

//3. reduce() to calculate total salary payout
const totalSalary=employees.reduce((empPrevSalary,empPostSalary)=>empPrevSalary+empPostSalary.salary,0)
console.log(totalSalary)

// 4. find() employee with salary 30000
const empSalary30000=employees.find((empSalary)=>empSalary.salary==30000)
console.log(empSalary30000)

//5. findIndex() of employee "Neha"
const empNeha=employees.findIndex((nehaIndex)=>nehaIndex.name=="Neha")
console.log(empNeha)