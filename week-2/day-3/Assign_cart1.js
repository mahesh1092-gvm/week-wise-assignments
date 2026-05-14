const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

// 1. Use filter() to get only inStock products
const filterInstock=cart.filter((cartObj)=>cartObj.inStock==true)
console.log(filterInstock)


// 2. Use map() to create a new array with:  { name, totalPrice}
let newArray=cart.map((element)=>({name:element.name,totalPrice:element.price*element.quantity}))
// let newArray=cart.map((element)=>{
//   return{
//     name:element.name,
//     totalPrice:element.price*element.quantity
//   };
// })
console.log(newArray)

//3. Use reduce() to calculate grand total cart value
const grandTotal=cart.reduce((priceAcc,cartObjPrice)=>priceAcc+cartObjPrice.price,0)
console.log(grandTotal)


//4. Use find() to get details of "Mouse"
const findMouse=cart.find((element)=>element.name=="Mouse")
console.log(findMouse)

//5. Use findIndex() to find the position of "Keyboard"
const findKeyboardIndex=cart.findIndex((element)=>element.name=="Keyboard")
console.log(findKeyboardIndex)