import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login
const createToken = (id) =>{
    return jwt.sign({ id },process.env.JWT_SECRET,{ expiresIn:"30d" });
}

export const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user  = await userModel.findOne({email})
        if(!user){
            return res.status(403).json({
                success:false,
                message:"Register account"
            })
        }
        
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(403).json({
                success:false,
                message:"Invalid credential"
            })
        }


        const token = createToken(user._id)

        return res.status(201).json({
            success:true,
            message:"Login Sucess",
            token,
            email,
            name:user.name
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:"error occured"
        })
    }   
}

//create token 

//reg 
export const registerUser =  async (req,res) =>{

    const {name,email,password} = req.body;
    try {
        const exist = await userModel.findOne({email})
        if (exist){
            res.json({
                success:false,message:"user already exist"
            })
        }

        if(!validator.isEmail(email)){
            return res.json({
                success:false,message:"please provide correct email"
            })
        }
        if(password.length<4){
            res.json({
                success:false,message:"please provide strong password"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            
        })

        const user = await newUser.save();
        // const token = createToken(user._id);
        // res.json({success:true,token})
        return res.status(201).json({
            success:true,
            message:"signup sucess"
        })
    } catch (error) {
        console.log(error);
        if(!res.headersSent){

                return res.status(500).json ({
                success:false,
                message:"error occured",
                error:error.message
            });
        }
        
        
        
    }
}

export default { loginUser, registerUser };