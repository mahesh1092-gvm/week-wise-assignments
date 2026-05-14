import { useContext } from "react";
import { counterContextObj } from "../contexts/counterContextObj";
import { useCounterStore } from "../store/counterStore";
export default function Home() {
  const { counter, changeCounter } = useContext(counterContextObj);
  const { counter1, changeCounter1 } = useContext(counterContextObj);
  const { newCounter, incrementCounter, decrementCounter } = useCounterStore();
  console.log(newCounter, counter, counter1);
  return (
    <div>
      <h1 className="text-3xl">Counter: {counter}</h1>
      <button onClick={changeCounter} className="bg-amber-300 p-5">
        Change
      </button>
      <h1 className="text-3xl">Counter1: {counter1}</h1>
      <button onClick={changeCounter1} className="bg-amber-300 p-5">
        Change
      </button>
      <h1 className="text-3xl">new Counter: {newCounter}</h1>
      <button onClick={incrementCounter} className="bg-amber-300 p-5">
        increment new counter
      </button>
    </div>
  );
}
