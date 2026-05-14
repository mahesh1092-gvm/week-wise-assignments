function Product(props){
  const {productObj} = props
  return(
       <div className="p-6 m-5 shadow-gray-400 shadow-2xl rounded-3xl ">
      <h2>ID: {productObj.id}</h2>
      <h3>Title: {productObj.title}</h3>
      <p>Price: {productObj.price}</p>
      <p>Description: {productObj.description}</p>
    </div>

  );
}
export default Product