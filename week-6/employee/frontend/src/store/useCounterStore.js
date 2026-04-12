import {create} from 'zustand'

//create store
export const useCounterStore=create((set)=>({
    //state
    newCounter:0,
    newCounter1:100,
    //add user state name age email
    user:{name:"mahesh",email:"mahesh@1234.com",age:20},
    //function to change email
    changeEmail:()=>set({...user,email:"mahi@1234.com"}),
    //function to change name age
    changeName:()=>set({...user,name:"mahi",age:21}),
    //function to modify the state
    incrementCounter:()=>set(state=>({newCounter:state.newCounter+1})),// {returning object}
    incrementCounter1:()=>set(state=>({newCounter1:state.newCounter1+1})),
    decrementCounter:()=>set(state=>({newCounter:state.newCounter-1})),
    reset:()=>set({newCounter:0}),
    //function to change newCounter to 500
    change:()=>set({newCounter:500}),
    // function to decrement newCounter by 20
    decrement:()=>set(state=>({newCounter:state.newCounter-20})),
}))