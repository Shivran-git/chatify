import User from "../models/User.js"
import jwt from "jsonwebtoken"


export const protectRouter = async (req, res,  next)=>{
         try{
        const token = req.cookies.jwt ;
        if(!token) return res.status(401).json({message : "Unathorized user - No token provided ."})
        const verified = jwt.verify(token, process.env.JWT_SECRET);
    
        if(!verified) return res.status(401).json({message : "Unathorized - Invalid Token ."})

            const user = await User.findById(verified.userId).select("-password");
            if(!user) return res.status(404).json({message : "User not found"})

                req.user = user ;

                next();
     
         }catch(error){
             console.log("Error in protectRouter middleware .", error);
             return res.status(500).json({
                message : "Internal Server Error  "
             })
         }
}

