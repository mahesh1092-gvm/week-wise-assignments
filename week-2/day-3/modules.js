// // modules ---make program modular,,,improve maintainence,reusability,,,,,modules can interact with each other
// let data=[4,3,6,9,8,5]
// let person={      // ref obj stored in stack
//     name:"mahesh",//obj
//     age:20        //obj stored in heap
// }
//  let user="mahi"
// //export   
//            // default export // a module cannot have more than 1 export default
//        //    export default {data,person,user}




//         // named export
//  export let data=[4,3,6,9,8,5]
//  export let person={     
//     name:"mahesh",
//     age:20        
// }
 // or 
 let data=[4,3,6,9,8,5]
 let person={     
    name:"mahesh",
    age:20        
}
export {data,person}