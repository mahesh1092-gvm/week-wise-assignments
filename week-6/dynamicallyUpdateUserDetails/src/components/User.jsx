
function User(props){
  const {userObj} = props
  return(
    
      <div>
        <h1>{userObj.name}</h1>
      <p>{userObj.email}</p>
      </div>
    
  );
}
export default User;
