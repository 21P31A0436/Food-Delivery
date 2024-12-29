import userModel from "../models/userModel.js"



const addtocart = async(req,res)=>{
    // const { userId } = req.body;
    try {
        
        let userData = await userModel.findOne({_id:req.body.userId });
        
        // let userData = await userModel.findOne(req.body.userId)
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({sucess:true ,message:"Add to cart"})

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        });
    }

}

const removecart = async(req,res)=>{
    try {
        let userData = await userModel.findById({_id:req.body.userId})
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({
            success:true,
            message:"Remove food"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"error"
        });
    }

}

const getcart = async(req,res)=>{

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData })
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }

}

export  { addtocart, getcart, removecart  }