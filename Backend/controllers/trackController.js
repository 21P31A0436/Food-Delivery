import ordermodel from "../models/orderModel.js";
import usermodel from "../models/userModel.js";
// import Stripe from "stripe"
const placeorder = async(req,res)=>{
    try {
        
        const neworder = ordermodel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
            
        })
        await neworder.save();

        await usermodel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                produt_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80,
            },
            quantity:item.quantity,
        }))
        line_items.push({
            price_data:{
                currency:"inr",
                produt_data:{
                    name:"Delivary charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })


        // const session = await Stripe.checkout.sessions.create({
        //     line_items:line_items,
        //     mode:'payment',
        //     success_url:`http://localhost:5173/verify?sucess=true&orderId=${newOrder._id}`
        // })
        return res.status(201).json({success:true,
            message:"Order placed"
        })
    } 
    catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"error"
        })
        
    }

}


//users orders for frontend
const userOrders = async(req,res)=>{

    try {
        const orders = await ordermodel.find({userId:req.body.userId});

        res.json({
            success:true,
            data:orders
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"error"
        })
        
    }

}


const listOrders = async(req,res) =>{

    try {
        const orders = await ordermodel.find({})
        res.json({
            success:true,
            data:orders
        })
        
    } catch (error) {

        console.log(error)
        res.json({
            success:false,
            message:"error"
        })
        
    }

}

export  { placeorder, userOrders, listOrders }