import { useState } from "react";
function TestRefTypes() {
  //state
  const [user, setUser] = useState({
    username: "sanju",
    age: "20",
    city: "pdpl",
  });
  const [marks, setMarks] = useState([10, 20, 30]);
  //upadte user state
  const updateUser = () => {
    setUser({ ...user, username: "sanjay ponaganti" });
  };
  //update marks
  const updateMarks = () => {
    setMarks([...marks, 40]);
  };
  return (
    <div className="mt-9 text-3xl">
      <p>Username:{user.username}</p>
      <p>Age:{user.age}</p>
      <p>City:{user.city}</p>
      <button onClick={updateUser} className="p-5 bg-emerald-500">
        Update user
      </button>

      <button onClick={updateMarks}>update marks</button>
    </div>
  );
}
export default TestRefTypes;
