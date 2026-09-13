import User from "../models/User.js"
import Message from "../models/message.model.js"
import cloudinary from "../Configurations/coudinary.js";

export const sendMessage = async (req, res)=>{

try{
    const myId = req.user._id ;
    const {id : yourId} = req.params
    const {text, image} = req.body;     
if(!text && !image){
    return res.status(400).json({message : "Can't send an empty message ."})
}

  let imageUrl ;
  if(image){
   const uploadedImage =  await cloudinary.uploader.upload(image)
   imageUrl =  uploadedImage.secure_url ;
  }

  const newMessage = new Message({
    senderId : myId,
    receiverId : yourId,
    text,
    image : imageUrl
  })
  await newMessage.save();


  return res.status(200).json({
    message : newMessage
  })

}catch(error){
    console.log("Error in sending the message ==>", error);
    return res.status(500).json({
        message : "Internal Server Error"
    })
}
}