import Message from "../models/message.model.js";
import User from "../models/User.js";

export const getMessagesByUserId = async (req, res)=>{
    try{
      const myId = req.user._id ;
      const {id : yourId} = req.params ;
      
      const messages = await Message.find({$or : [
        {senderId : myId, receiverId : yourId},
        {senderId : yourId, receiverId : myId}
    
    ]})

    return res.status(200).json(messages)
    }catch(error){
           console.log("Error in getting messages. ==>", error);
           return res.status(500).json({
            message : "Internal Server Error"
           })
    }
}