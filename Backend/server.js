import express from "express"
import cors from "cors";
import { connectDB } from "./config/db.js"

import  foodRouter  from "./routes/foodRouter.js";
import orderRouter from'./routes/orderRouter.js';
import userRouter from "./routes/userRouter.js";
import morgan from "morgan";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import cartrouter from "./routes/cartRoute.js";
import path from "path";
dotenv.config();
const app =express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended:true}));
//db cone
connectDB();

const _dirname = path.resolve();
//api food route
app.use('/api/food',foodRouter);

//cart operations
app.use("/api/cart",cartrouter);

//images
app.use("/images",express.static('uploads'))

//login
app.use("/api/user",userRouter);
//order
app.use('/api/order',orderRouter);

app.use(express.static(path.join(_dirname,"/vite-project/dist ")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"vite-project", "dist", "index.html"));
})

app.get('/',(req,res)=>{
    res.send("Backend Working");
})

app.listen(port, () =>{
    console.log(`server start:${port}`)
})




// mongodb+srv://maddulavenkatasurendrakumar:3fRcAYYBdbAmwWF7@cluster0.10elo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0