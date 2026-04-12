import { Schema,model } from "mongoose";
const employeeSchema=new Schema({
    name:{
      type:"String",
    required:[true, "name is required"],
    },
    email:{
        type:"String",
        required:[true,"email is required"],
        unique:[true,"email already existed"]
    },
    mobile:{
        type:"Number",
        required:[true,"number is required"]
    },
    designation:{
        type:"String"
    },
    companyName:{
        type:"String"
    }

},
{
    strict:"throw",
    versionKey:false,
    timestamps:true,  
}
);

export const employeeModel=model("employee",employeeSchema)