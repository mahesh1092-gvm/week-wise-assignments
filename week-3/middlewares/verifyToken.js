import jwt from "jsonwebtoken";
const { verify } = jwt;

export function verifyToken(req, res, next) {
  //token verification login
  //console.log("token obj is:", req.cookies.token);
  const token = req.cookies?.token;
  //if req from unauthorised user
  if (!token) {
    return res.status(401).json({ message: "please login" });
  }
  //if token existed
  try {
    const decodedToken = verify(token, "abcdef");
    console.log(decodedToken);
    //attach decoded token to req.user
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ message: "session expired please re-login" });
  }
}
