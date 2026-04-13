import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { hash, compare } from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
const { sign } = jwt;
export const commonApp = exp.Router();
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";
config();

//Route for register
commonApp.post("/users", upload.single("profileImageUrl"), async (req, res) => {
  let cloudinaryResult;
  try {
    let allowedRoles = ["USER", "AUTHOR"];
    //get user from req
    const newUser = req.body;
    console.log(newUser);
    console.log(req.file);

    //check role
    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    //Upload image to cloudinary from memory the Storage
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    // console.log("cloudinaryResult", cloudinaryResult); // to know in print statement
    //add CDN link(secure_url) of image to newUserObj
    newUser.profileImageUrl = cloudinaryResult?.secure_url;

    //run validators manually
    //hash password and replace plain with hashed one
    newUser.password = await hash(newUser.password, 12);

    //create New user document
    const newUserDoc = new UserModel(newUser);

    //save document
    await newUserDoc.save();
    //send res
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log("err is ", err);
    //delete image from cloudinary data
    if (cloudinaryResult.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err);
  }
});

//Route for Login(USER, AUTHOR and ADMIN)
commonApp.post("/login", async (req, res) => {
  //console.log(req.body)
  //get user cred obj
  const { email, password } = req.body;
  //find user by email
  const user = await UserModel.findOne({ email: email });
  //if use not found
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  //compare password
  const isMatched = await compare(password, user.password);
  //if passwords not matched
  if (!isMatched) {
    return res.status(400).json({ message: "Invalid password" });
  }
  //creating the jwt
  const signedToken = sign(
    {
      id: user._id,
      email: email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  //set token to res header as httpOnly cookie
  res.cookie("token", signedToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  //removing the password from user a  document
  let userObj = user.toObject();
  delete userObj.password;

  //send res
  res.status(200).json({ message: "login success", payload: userObj, token: signedToken });
});

//Route Logout
commonApp.get("/logout", (req, res) => {
  //delete token from cookie storage
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  //send res
  res.status(200).json({ message: "Logout success" });
});

//Page refresh
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({
    message: "authenticated",
    payload: req.user,
  });
});

//Change password
commonApp.put("/password", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  //check current password and new password are same
  //get current password of user/admin/author
  //check the current password of req and user are not same
  // hash new password
  //replace current password of user with hashed new password
  //save
  //send res
});

//Public endpoint to view all active articles (no authentication required)
commonApp.get("/articles", async (req, res) => {
  try {
    const articlesList = await ArticleModel.find({ isArticleActive: true })
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({ articles: articlesList });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch articles', error: err.message });
  }
});