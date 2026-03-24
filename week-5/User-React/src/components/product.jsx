function Product(props){
  const {productObj} = props
  return(
    <>
      <h2 className=" ">{productObj.title}</h2>
      <p>{productObj.price}</p>
    </>
  );
}
export default Product