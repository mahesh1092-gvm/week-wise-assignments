const courses=["javascript","react","node","mongodb","express"]
const nameGreater_5=courses.filter((element)=>element.length>5)


//
console.log(nameGreater_5)

//
const upperCourses=courses.map((element)=>element.toUpperCase())
console.log(upperCourses)

//
const singleString=courses.reduce((accumulator,element)=>accumulator+" | "+element)
console.log(singleString)

//if found returns value else -1
const findReact=courses.find((element)=>element=="react")
console.log(findReact)

//
const indexOfNode=courses.findIndex((element)=>element=="node")
console.log(indexOfNode)