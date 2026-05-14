import exp from "express";
import { productModel } from "../models/ProductModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

//mini-express app
export const productApp = exp.Router();
//defining rest api
//creating product
productApp.post("/products", verifyToken, async (req, res) => {
  let newProduct = req.body;
  //create new product document
  const newProductDocument = new productModel(newProduct);

  //save the productDocument
  let result = await newProductDocument.save(); //to store data in database
  console.log(result); //to print on console of what data stores in database
  //send response
  res.status(201).json({ message: "product created" });
});

//read all products
productApp.get("/products", verifyToken, async (req, res) => {
  let productsList = await productModel.find(); //array of products
  res.status(200).json({ messaage: "All Products", payload: productsList });
});

//read product by id
productApp.get("/products/:id", verifyToken, async (req, res) => {
  //find product id url
  let productObjUrl = req.params.id;
  //using product id in url to get product
  let product = await productModel.findById(productObjUrl);
  //if product not found
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  //send response if product found
  res.status(200).json({ message: "product found", product });
});

//update product by id
productApp.put("/products/:id", verifyToken, async (req, res) => {
  //find produt id in url
  const productObjUrl = req.params.id;
  //get updated product
  const modifiedProduct = req.body;
  //get product by product id in url
  const product = await productModel.findByIdAndUpdate(
    productObjUrl,
    modifiedProduct,
  );
  //if not found
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  res.status(200).json({ message: "product updated", product });
});

//delete product by id
productApp.delete("/products/:id", verifyToken, async (req, res) => {
  //find url path
  const productIdUrl = req.params.id;
  //find product with url pathh
  const deletedProduct = await productModel.findByIdAndDelete(productIdUrl);
  //if not found
  if (!deletedProduct) {
    return res.status(404).json({ message: "product not found to delete" });
  }
  //send response
  res.status(200).json({ message: "deleted product", deletedProduct });
});
