import express from "express";
// const express = require("express")
import { addfood, listFood, removeFood } from "../controllers/foodController.js";
// import addfood from "../controllers/foodController.js";
// import listFood from "../controllers/foodController.js";
// import removeFood from "../controllers/foodController.js"
// import foodController from "../controllers/foodController.js";
import multer from "multer";
// const multer = require('multer')

const foodRouter = express.Router();    

//image staoraga
const storage = multer. diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer ({storage:storage});

foodRouter.post('/add',upload.single("image"),addfood);
foodRouter.get("/list", listFood);

foodRouter.post("/remove", removeFood);

export default foodRouter;