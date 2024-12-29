import mongoose from "mongoose";

const userSchems = new mongoose.Schema({
    name:{type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true, // Ensure email is unique
        lowercase: true, // Store email in lowercase
        trim: true,
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    }

},{minimize:false});
const usermodel = mongoose.models.user || mongoose.model("users",userSchems);
// const usermodel = mongoose.model("users",userSchems)
export default usermodel;