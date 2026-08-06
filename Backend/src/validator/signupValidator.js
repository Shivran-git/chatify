import User from "../models/User.js";

export const signupValidator = async (credentials)=>{

   const {name, modifiedEmail, pass} = credentials ;
        console.log(name);
        console.log(modifiedEmail);
        console.log(pass);
    if(!name || !modifiedEmail || !pass){
                const err = new Error("All fields are necessary ");
                err.statusCode = 404 ;
                throw err ;
            }
    
            if(pass.length < 8){
                const err = new Error("Password length is less than 8");
                err.statusCode = 404 ;
                throw err ;
            }
    
            const emailRegex = /^\w+([-.+']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(!emailRegex.test(modifiedEmail)){
                const err = new Error("invalid Email entered ");
                err.statusCode = 404 ;
                throw err ;
            }
    
     const user = await User.findOne({email : modifiedEmail});
     if(user){
        const err = new Error("Email already registered with us");
                err.statusCode = 404 ;
                throw err ;
     }
}