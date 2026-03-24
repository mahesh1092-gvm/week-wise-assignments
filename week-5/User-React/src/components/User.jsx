function User(props){
    const {userObj}=props
   
    return(
        <div className="p-6 m-5 shadow-2xl shadow-black rounded-3xl ">
            <div><img className="rounded-4xl justify-around " src={userObj.image} alt="" />
            <h2 >Name : {userObj.name}</h2>
            <h2>email : {userObj.email}</h2></div>
            
            

        </div>

    )

}
export default User