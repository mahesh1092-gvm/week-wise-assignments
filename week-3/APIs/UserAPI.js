//create mini-express app
import exp from "express";
import { userModel } from "../models/UserModel.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";

//destructring for jwt
const { sign } = jwt;

export const userApp = exp.Router();

//Define user rest api routes.

//user login
userApp.post("/auth", async (req, res) => {
  //get cred obj from client
  const { email, password } = req.body;
  //verify email
  let user = await userModel.findOne({ email: email });
  //if not found
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  //compare passwords
  let result = await compare(password, user.password);
  //if password mismatched
  if (!result) {
    return res.status(400).json({ message: "invalid password" });
  }
  //if password matched
  //create token (jsonwebtoken)
  const signedToken = sign({ email: user.email }, "abcdef", {
    expiresIn: 2000,
  });
  //store token as httpOnly cookie
  res.cookie("token", signedToken, {
    httpOnly: true, //very very important
    sameSite: "lax",
    secure: false,
  });
  //send token in response
  res.status(200).json({ message: "login success", payload: user });
  //payload:user used to show details who currently logged in
});

userApp.post("/users", async (req, res) => {
  //get new user object from request.
  const newUser = req.body;
  //hash the password
  const hashedPassword = await hash(newUser.password, 10);
  //replace plain password with hashed password
  newUser.password = hashedPassword;
  //create new user document
  const newUserDocument = new userModel(newUser);
  //save
  const result = await newUserDocument.save();
  console.log(result);
  //send response
  res.status(201).json({ message: "user created" }); //201:successful creation of document
});

//read all users(make it protected)
userApp.get("/users", verifyToken, async (req, res) => {
  //read all users from db
  let usersList = await userModel.find();
  //send res
  res.json({ message: "users", payload: usersList });
});

//read user by ObjectId
userApp.get("/user", verifyToken, async (req, res) => {
  //read object id from req param
  // const uid = req.params.id;

  //read email from request
  const emailOfUser = req.user?.email;
  //console.log(emailOfUser);

  //find user by id->email
  // const userObject = await userModel.findOne({ _id: uid });
  const userObject = await userModel
    .findOne({ email: emailOfUser })
    .populate("cart.product"); //here product -> ref:"product" in userModel.js
  //if not found
  if (!userObject) {
    return res
      .status(404)
      .json({ message: "user not found", payload: userObject });
  }
  //send res
  res.status(200).json({ message: "user", payload: userObject });
});
//update user by id
userApp.put("/users/:id", verifyToken, async (req, res) => {
  //get modified user from req
  const modifiedUser = req.body;
  const hashedUser = await hash(modifiedUser.password, 10);

  const uid = req.params.id;
  //find user by id and //update user
  const updatedUser = await userModel.findByIdAndUpdate(
    uid,
    { $set: { ...hashedUser } },
    { new: true, runValidators: true },
  );
  //send response
  res.status(200).json({ message: "User updated", paylodad: updatedUser });
});

//find by id and delete
userApp.delete("/users/:id", verifyToken, async (req, res) => {
  let usersList = await userModel.find();
  //get id
  const uid = req.params.id;
  //find user by id and delete
  let deletedUser = await userModel.findByIdAndDelete(uid);
  if (!deletedUser) {
    return res.status(404).json({ message: "user not deleted" });
  }
  //send response
  res.status(200).json({ message: "User Deleted:", deletedUser });
});

//add product to cart
// userApp.put("/cart/product-id/:pid", verifyToken, async (req, res) => {
//   //get product if from url
//   let productId = req.params.id;
//   //get current user details
//   const emailOfUser = req.user?.email;
//   //get user from database
//   // const user = await userModel.findOne({ email: emailOfUser });
//   //add product to cart

//   let result = await userModel.findOneAndUpdate(
//     { email: emailOfUser },
//     { $push: { cart: { product: productId } } },
//   );
//   //if user invalid
//   if (!result) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   console.log(result);
//   res.status(200).json({ message: "product added to cart" });
// });

//add product count
userApp.put("/cart/product-id/:id", verifyToken, async (req, res) => {
  //get product if from url
  let productId = req.params.id;
  //get current user details
  const emailOfUser = req.user?.email;
  //get user from database
  // const user = await userModel.findOne({ email: emailOfUser });
  //add product to cart

  for (let pd in userModel.cart) {
    if (pd.id == productId) {
      return count++;
    }
  }

  let result = await userModel.findOneAndUpdate(
    { email: emailOfUser },
    { $push: { cart: { product: productId } } },
  );
  //if user invalid
  if (!result) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log(result);
  res.status(200).json({ message: "product added to cart" });
});
