function User(props){
    const {userObj}=props
   
    return(
        <div className="p-6 m-5 shadow-gray-400 shadow-2xl rounded-3xl ">
            <div className="flex justify-center">
                <img className="rounded-4xl" src={userObj.image} alt="" />
            </div>
            <h2>Name : {userObj.name}</h2>
            <h2>email : {userObj.email}</h2>
        </div>

    )

}
export default User
