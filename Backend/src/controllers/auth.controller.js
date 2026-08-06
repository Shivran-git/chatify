import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/util.js";
import { signupValidator } from "../validator/signupValidator.js";
import { hasher } from "../utils/hasher.js";
export const signup = async (req, res)=>{
    const {fullName, email, password} = req.body;

    try{
        await signupValidator(req);
         const hashedPassword = await hasher(password);
        

 const newUser = new User({
    fullName,
    email,
    password : hashedPassword
 })
 if(newUser){
    generateToken(newUser._id, res);
    
    await newUser.save();

    
    res.status(201).json({
        id: newUser._id,
        fullName : newUser.fullName,
        email : newUser.email,
        profilePic : newUser.profilePic,
        message : "User signed up successfully ."
    })
 }
    }catch(error){
        if(error.statusCode){
            return res.status(error.statusCode).json({
                message: error.message
            })
        }
          console.log("Error in signing up", error);
          res.status(500).json({
            message : "Error in signing up ."
          })
    }

}