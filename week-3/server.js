//create express app
import exp from "express";
import { connect } from "mongoose";
import { userApp } from "./APIs/UserAPI.js";
import { productApp } from "./APIs/ProductAPI.js";
import cookieParser from "cookie-parser";
const app = exp();

//start server
app.listen(2005, () => console.log("server on port 2005..."));
app.use(exp.json());

//add cookie parse middleware
app.use(cookieParser());

app.use("/user-api", userApp);
app.use("/product-api", productApp);
//async and await
async function connectDB() {
  try {
    await connect("mongodb://localhost:27017/mydata");
    console.log("db connecion successfull");
  } catch (err) {
    console.log("errr in the db connection: ", err);
  }
}
connectDB();

//error handling middleware
app.use((err, req, res, next) => {
  // res.json({ message: "error occurred:", error: err.message });
  console.log(err.name);
  if (err.name == "ValidatorError") {
    return res.status(400).json({ message: "error occured", error: err.name });
  }
  if (err.name == "CastError") {
    return res.status(400).json({ message: "error occured", error: err.name });
  }
  res.status(500).json({
    message: "error occured",
    error: "server side error",
    error: err.name,
  });
});
