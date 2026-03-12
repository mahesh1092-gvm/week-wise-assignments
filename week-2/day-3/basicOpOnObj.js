let person={      // ref obj stored in stack
    name:"mahesh",//obj
    age:20        //obj stored in heap
}
// add new property
person.city="hyd"
console.log(person)
// update property
person.name="VYShu" // key should be present to update if not it adds(like add property)
console.log(person) 
// delete a property
delete(person.age) // delete person.age
console.log(person)
// objects do not have begin ending ,,,,be=coz unordered
