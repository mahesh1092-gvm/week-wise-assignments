import React from 'react'
import { useContext } from 'react'
import { counterContextObj } from '../contexts/ContextProvider'
import { useCounterStore } from '../store/useCounterStore'
function Home() {

  //call useCounterStore hook to get state of zustand store
                            //const {newCounter, incrementCounter, DecrementCounter}=useCounterStore();
                            //console.log(k)
  let newCounter=useCounterStore((state)=>state.newCounter)
  let incrementCounter=useCounterStore((state)=>state.incrementCounter)

  const {counter,changeCounter}=useContext(counterContextObj)
  const {counter1,changeCounter1}=useContext(counterContextObj)
  //console.log(result)
  console.log(counter);
  console.log(counter1);
  console.log(newCounter);
  return (
    <div>
      <h1 className='text-3xl'>counter:{counter}</h1>
      <button onClick={changeCounter} className='bg-amber-300 p-5'>change</button>
      <h1 className='text-3xl'>counter1:{counter1}</h1>
      <button onClick={changeCounter1} className='bg-amber-300 p-5'>change</button>
      <h1 className='text-3xl'>newCounter:{newCounter}</h1>
      <button onClick={incrementCounter} className='bg-amber-300 p-5'>Increment new Counter</button>
    </div>
  )
}

export default Home
