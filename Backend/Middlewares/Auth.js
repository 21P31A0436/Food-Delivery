// const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not auth to login"})
    }

    try {
        // const authHeader = req.headers.authorization;
        // if (!authHeader || !authHeader.startsWith("Bearer ")) {
        //     return res.status(401).json({ success: false, message: "No token provided or invalid format" });
        // }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        req.body.userId= token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        res.status({success:false,message:"error"})
    }

}

export default  authMiddleware;