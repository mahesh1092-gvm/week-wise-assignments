import { useState } from "react";
import { counterContextObj } from "./counterContextObj";

function ContextProvider({ children }) {
  //state
  const [counter, setCounter] = useState(10);
  const [counter1, setCounter1] = useState(20);

  const changeCounter = () => {
    setCounter(counter + 1);
  };
  const changeCounter1 = () => {
    setCounter1(counter1 + 1);
  };

  return (
    <counterContextObj.Provider
      value={{ counter, counter1, changeCounter, changeCounter1 }}
    >
      {children}
    </counterContextObj.Provider>
  );
}

export default ContextProvider;
