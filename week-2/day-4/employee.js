class Employee {
    #eno;
    #ename;
constructor(eno,ename){
    this.#eno=eno;
    this.#ename=ename;
}
getData(){
    console.log(`eno is${this.#eno} and name is ${this.#ename}`)
}
//static 

}
const emp=new Employee(10,"mahesh")
console.log(emp.eno)
