import { useEffect, useState } from "react";
function APIDemo() {
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  useEffect(() => {
    //a function to make API req
    setLoading(true);
    async function getData() {
      try {
        let res = await fetch("https://jsonplaceholder.typicode.com/posts");
        let usersList = await res.json();
        //updateState
        setUsers(usersList);
      } catch (err) {
        console.log("Error: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    //call
    getData();
  }, []); //use dependency array to make 2 request, else useEffect violates the api limits by requesting continously
  //console.log("API Demo Rendered");
  //deal with loading state
  if (loading) {
    return <p className="text-center text-5xl">Loading...</p>;
  }

  //deal with error state
  if (error != null) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl text-blue-800">List of Users</h1>
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {users.map((userObj) => (
          <div
            key={userObj.id}
            className="p-2.5 mx-10 rounded-3xl shadow-2xl shadow-cyan-300"
          >
            <p>{userObj.title}</p>
            <p>{userObj.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default APIDemo;
