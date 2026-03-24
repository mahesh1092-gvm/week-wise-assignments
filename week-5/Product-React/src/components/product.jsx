function Product(props){
  const {productObj} = props
  return(
    
    <>
    <div className="p-6 m-5 shadow-2xl shadow-black rounded-3xl  ">
        <div className="gap-20">
        <h1>ID:{productObj.id}</h1>
    <h1>Title:{productObj.title}</h1>
    <p className="text-green-500">Price:{productObj.price}</p>
    <img src="{productObj.image}" alt="Not Found" />
    
    </div>
    </div>
    </>
  );
}
export default Product