import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { emailValidate } from "../validator/emailValidator.js";
import { generateToken } from "../utils/util.js";

export const login = async (req, res)=>{
    const {email, password} = req.body ;
    if(!email || !password){
        return res.status(400).json({
            message : "All fields are required ."
        })
    }
    try{
       emailValidate(email);
       const normalizedEmail = email.toLowerCase();
      const user = await User.findOne({email : normalizedEmail});
      if(user){
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(isPasswordCorrect){
            generateToken(user._id, res)
         return   res.status(200).json({
                message : "Logged In Successfully ..."
            })
        }else{
            return res.status(401).json({
                message : "Either email or password is incorrect ."
            })
        }
      }else{
           return res.status(401).json({
            message : "Either email or password is incorrect ."
           })
    }
    }catch(error){
       console.log(error);
       return res.status(error.statusCode || 500).json({
        message : error.message || "Internal Server Error ."
       })
    }
}