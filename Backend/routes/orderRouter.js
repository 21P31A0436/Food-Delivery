import express from "express";
// // import { placeorder } from "../controllers/orderController.js";
import  { listOrders, placeorder, userOrders }  from "../controllers/trackController.js";
import authmiddleware from "../Middlewares/Auth.js";
const orderRouter = express.Router()

orderRouter.post('/place',authmiddleware,placeorder);
orderRouter.post('/userorders', authmiddleware,userOrders);

orderRouter.get('/list', listOrders);
export default  orderRouter ;