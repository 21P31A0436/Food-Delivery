import mongoose from "mongoose";
// const mongoose = require('mongoose');


 export const  connectDB = async()=>{

  //  await mongoose.connect("mongodb+srv://maddulavenkatasurendrakumar:sn2186YDRhAhU1d3@cluster0.gxsbl.mongodb.net/practice?retryWrites=true&w=majority&appName=Cluster0",{
    // await mongoose.connect("mongodb+srv://maddulavenkatasurendrakumar:kTJaeQbPygVp00tS@cluster0.m3y8u.mongodb.net/Food-del?retryWrites=true&w=majority&appName=Cluster0",{
    await mongoose.connect('mongodb+srv://maddulavenkatasurendrakumar:OjVHvKPKMpnAXmhd@cluster0.9fuuo.mongodb.net/Restaurent?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
   })
        .then(()=>console.log("DB is connected"))
        .catch((err) =>console.log(err))
    
}
// module.exports = connectDB;
export default connectDB;