import {Schema,model,Types} from 'mongoose'

//create cart schema {product, count}
const cartSchema=new Schema({
    product:{
        type:Types.ObjectId,
        ref:"product" //name of the product model
    },
    count:{
        type:Number,
        default:1
    }
})
// create user schema(username,password,mail,age)
const userSchema=new Schema({
    //str of user resource
    username:{
        type:String,
        required:[true,"username is required"],
        minLength:[4,"min 4 chars required"],
        maxLength:[10,"max 10 chars only"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:[true,"email already existed"],
    },
    age:{
        type:Number,
    },
    cart:[cartSchema]//{product :"", count:num}
},
{
    versionKey:false,
    timestamps:true,
},
);
// geneate user model
export const userModel=model("user",userSchema)
