import express from "express";

import { addtocart,removecart,getcart } from "../controllers/cartController.js";

import authMiddleware from "../Middlewares/Auth.js";

const cartrouter = express.Router();

cartrouter.post('/add',authMiddleware, addtocart);

cartrouter.post('/remove',authMiddleware, removecart);

cartrouter.post('/get', authMiddleware, getcart);

export default cartrouter;
// module.exports = cartrouter;