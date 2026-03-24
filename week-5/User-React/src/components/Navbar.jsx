function Navbar(){

    return(
        <div className="flex justify-between p-5 bg-gray-500 text-amber-50 ">
            <h1>LOGO</h1>
            <ul className="flex gap-7 ">
                <li><a href="">Home</a></li>
                <li><a href="">Register</a></li>
                <li><a href="">Login</a></li>
            </ul>

        </div>
    )

}
export default Navbar