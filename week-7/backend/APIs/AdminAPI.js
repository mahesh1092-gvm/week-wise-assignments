import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { UserModel } from "../models/UserModel.js";

export const adminApp = exp.Router();

// get all users
adminApp.get("/users", verifyToken("ADMIN"), async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({ message: "Users list", payload: users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// deactivate user
adminApp.put("/deactivate-user/:id", verifyToken("ADMIN"), async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "User deactivated" });
  } catch (err) {
    res.status(500).json({ message: "Error deactivating user" });
  }
});

// activate user
adminApp.put("/activate-user/:id", verifyToken("ADMIN"), async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, { isActive: true });
    res.json({ message: "User activated" });
  } catch (err) {
    res.status(500).json({ message: "Error activating user" });
  }
});

// delete user
adminApp.delete("/delete-user/:id", verifyToken("ADMIN"), async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});
