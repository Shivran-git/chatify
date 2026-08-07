export const emailValidate = (email)=>{
    
                const emailRegex = /^\w+([-.+']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

          const checkThisEmail = email.trim();
           if(!emailRegex.test(checkThisEmail)){
                const err = new Error("invalid Email entered ");
                err.statusCode = 400 ;
                throw err ;
            }
}