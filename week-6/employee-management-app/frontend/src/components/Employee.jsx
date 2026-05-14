import { useLocation } from "react-router";
export default function Employee() {
  //read  state recieved in navigation
  const { state } = useLocation();

  return (
    <div className="p-16 text-center text-2xl justify-center">
      <div className="p-16 max-w-2xl shadow-2xl shadow-gray-700">
        <p>{state.name}</p>
        <p>{state.email}</p>
        <p>{state.mobile}</p>
        <p>{state.designation}</p>
        <p>{state.companyName}</p>
      </div>
    </div>
  );
}
