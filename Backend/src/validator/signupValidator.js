import User from "../models/User.js";

export const signupValidator = async (req)=>{
    const {fullName, email, password} = req.body ;

    if(!fullName || !email || !password){
                const err = new Error("All fields are necessary ");
                err.statusCode = 404 ;
                throw err ;
            }
    
            if(password.length < 8){
                const err = new Error("Password length is less than 8");
                err.statusCode = 404 ;
                throw err ;
            }
    
            const emailRegex = /^\w+([-.+']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(!emailRegex.test(email)){
                const err = new Error("invalid Email entered ");
                err.statusCode = 404 ;
                throw err ;
            }
    
     const user = await User.findOne({email});
     if(user){
        const err = new Error("Email already registered with us");
                err.statusCode = 404 ;
                throw err ;
     }
}