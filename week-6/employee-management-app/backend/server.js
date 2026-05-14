import exp from "express";
import { employeeModel } from "./models/employeeModel.js";
import { employeeApp } from "./Api's/employeeApi.js";
import { connect } from "mongoose";
import cors from "cors";
const app = exp();

//add cors middleware
app.use(cors({ origin: ["http://localhost:5173"] }));

app.use(exp.json());
app.use("/employee-api", employeeApp);
const port = 5432;
async function connectDb() {
  try {
    await connect("mongodb://localhost:27017/EmployeeDemo");
    console.log("databasse connection succesfull");
    app.listen(port, () => console.log(`server is listening on ${port}`));
  } catch (err) {
    console.log("database connection falied");
  }
}
connectDb();
