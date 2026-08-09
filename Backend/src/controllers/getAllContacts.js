import User from "../models/User.js"
import Message from "../models/message.model.js";

export const getAllContacts = async (req , res)=>{
    try{
        const loggedInUser = req.user ;
        const contacts = await User.find({_id : {$ne : loggedInUser._id}},{password : 0});
        

        return res.status(200).json({
            success : true,
            message : contacts
        })
    }catch(error){
           console.log("Error in getting Contacts. ==>", error);
           return res.status(500).json({
            message : "Internal Server Error"
           })
    }
}