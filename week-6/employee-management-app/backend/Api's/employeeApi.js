import exp from "express";
import { employeeModel } from "../models/employeeModel.js";

export const employeeApp = exp.Router();

// CREATE
employeeApp.post("/employee", async (req, res) => {
  try {
    const newEmp = req.body;

    console.log("Incoming Data:", newEmp);

    const employeeDocument = new employeeModel(newEmp);

    await employeeDocument.save();

    console.log("Saved to database");

    res.status(201).json({
      message: "Employee created successfully",
      payload: employeeDocument,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);

    res.status(500).json({
      message: "Error creating employee",
      error: error.message,
    });
  }
});

// GET ALL
employeeApp.get("/employee", async (req, res) => {
  try {
    const getUser = await employeeModel.find();

    res.status(200).json({
      message: "Users fetched",
      payload: getUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// UPDATE
employeeApp.put("/employee/:id", async (req, res) => {
  try {
    const modifiedEmp = req.body;

    const updatedEmp = await employeeModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...modifiedEmp },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedEmp) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Updated successfully",
      payload: updatedEmp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
});

// DELETE
employeeApp.delete("/employee/:id", async (req, res) => {
  try {
    const employeeObjUrl = req.params.id;

    const deletedEmployee =
      await employeeModel.findByIdAndDelete(employeeObjUrl);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee deleted",
      payload: deletedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
});