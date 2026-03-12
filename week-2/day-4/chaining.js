//optional chaining and nullishing colishing
const person={
    pid:100,
    name:"mahi"
}
console.log(person.pid)  //100
console.log(person.marks) // undefined
console.log(person.marks?.length??"marks not available") //type error // if ? is there it gives undefined
console.log(person.address?.city)
console.log(person.address?.city?.length) // if add present go to city...if city present print city length
