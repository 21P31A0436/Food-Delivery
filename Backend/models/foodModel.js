import mongoose from "mongoose";
// const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description: {type:String},
    price: {type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const foodModel = mongoose. models. foods || mongoose.model("foods", foodSchema);

export default foodModel;