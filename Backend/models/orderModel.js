import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    // firstName:{
    //     type:String,
    //     required:true
    // },
    // lastName:{
    //     type:String,
    //     required:true
    // },
    // email:{
    //     type:String,
    //     required:true
    // },
    // street:{
    //     type:String,
    //     required:true
    // },
    // city:{
    //     type:String,
    //     required:true
    // },
    // zipcode:{
    //     type:Number,
    //     required:true
    // },
    // country:{
    //     type:String,
    //     required:true
    // },

    status:{type:String,default:"food processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:"false"}
})


const ordermodel = mongoose.models.order || mongoose.model("orders",orderSchema);

export default ordermodel;