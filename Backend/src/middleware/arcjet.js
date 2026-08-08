import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../Configurations/arcjet.js";

export const arcjetProtection = async (req, res, next)=>{

    try{
        const decision = await aj.protect(req);
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
             return res.status(429).json({message : "There are too many requests here ."})
            }else if(decision.reason.isBot()){
             return res.status(403).json({message : "Only humans allowed ."})
            }else{
                return res.status(403).json({message : "Access Forbidden ."})
            }

        }

        if(decision.results.some(isSpoofedBot)){
                 return res.status(403).json({
                    message : "Got you ! You are not a human anymore ."
                 })
        }

        next();

    }catch(error){
        console.log("arcjet protection error ", error);
        next();
}
}