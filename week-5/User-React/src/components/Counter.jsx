import { useState } from 'react'
function Counter(){
    //state
    const [count,setCount]=useState(0);
    const increment=()=>{
        setCount(count+1)
    }
    const Decrement=()=>{
        setCount(count-1)
    }

    return(
        <div className='text-center px-6 py-3 m-10'>
            <h1>Count:{count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={Decrement}>-</button>

        </div>
    )


}
export default Counter