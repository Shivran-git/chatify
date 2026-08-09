import User  from "../models/User.js"
import Message from "../models/message.model.js";

export const getAllChats = async (req, res)=>{
    try{
        const myId = req.user._id ;
       const users = await User.find({_id : { $ne : myId}}, {}); //here we get all users other than me .
       const messages = await Message.find({ $or : [{senderId : myId}, {receiverId : myId}]});

       const chats =  [
        ...new Set(messages.map((msg)=>
        msg.senderId.toString() === myId.toString() 
       ? msg.receiverId.toString() : msg.senderId.toString()
       ))];

       const chatPartners = await User.find({_id : { $in : chats}}, {password : 0});
      return res.status(200).json(chatPartners);

    }catch(error){
           console.log("Unable to fetch the chats ==>", error);
           return res.status(500).json({
            message : "Internal Server Error ."
           })
    }
       
}