
function Product(props){
  const {productObj} = props
  return(
    <>
      <div className="shadow-2xl">
        <h2 className="">{productObj.title}</h2>
      <p>{productObj.price}</p>
      <p>{productObj.description}</p>
      </div>
    </>
  );
}
export default Product
