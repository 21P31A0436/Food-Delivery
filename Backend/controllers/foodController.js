// import foodModel from "../models/foodModel";
// const foodModel = require('foodModel');

import { fail } from "assert";
import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item


export const addfood = async(req,res) =>{
    let image_filename = `${req.file.filename}`

    const food = foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error occured"})
    }

    
}

export const listFood = async(req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}

export const removeFood = async (req,res)=>{
    
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({success:true,message:"food removed"})


    } catch (error) {
        console.log(error)
        res.json({success:fail,message:"error"})   
    }
}
export default { addfood, listFood, removeFood };