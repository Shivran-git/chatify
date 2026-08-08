
import cloudinary from "../Configurations/coudinary.js";
import User from "../models/User.js";


export const updateProfile = async (req, res)=>{

       const {profilePic} = req.body ;
       if(!profilePic) return res.status(400).json({message : "Image not found"});
       const userId = req.user._id ;
    try{
     const uploadImage = await cloudinary.uploader.upload(
       profilePic , {
            public_id: 'shoes'
        }
     )

    const updatedUser =  await User.findByIdAndUpdate(userId, {profilePic : uploadImage.secure_url}, {new : true})
     console.log(uploadImage)
     return res.status(200).json({
        message : "Image upload is successful"
     })
    }catch(error){
       return res.status(500).json({
        message : "Internal Server Error"
       })
    }
}