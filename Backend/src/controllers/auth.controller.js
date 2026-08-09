import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/util.js";
import { signupValidator } from "../validator/signupValidator.js";
import { hasher } from "../utils/hasher.js";
import { mailSender } from "../Configurations/resend.js";
export const signup = async (req, res)=>{
     const {fullName, email, password} = req.body ;
          if(!fullName || !email || !password) return res.status(400).json({message : "All fields required ."})
   const name =          fullName.trim().replace(/\s+/g, '') ;
   const modifiedEmail =  email.trim().toLowerCase() ;
   const pass =          password ;
 
const credentials = {
    name,
    modifiedEmail,
    pass
}

    try{
        await signupValidator(credentials);
         const hashedPassword = await hasher(pass);
        

 const newUser = new User({
    fullName : name,
    email : modifiedEmail,
    password : hashedPassword
 })
 if(newUser){
    
    await newUser.save();

    generateToken(newUser._id, res);
    try{
       await   mailSender(newUser.email, newUser.fullName);
    }catch(error){
       console.log("Failed to send the email .")
    }
 

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