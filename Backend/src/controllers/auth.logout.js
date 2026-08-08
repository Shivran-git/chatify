export const logout = async (_, res)=>{


     res.cookie("jwt","",{maxAge : 0})  


     return res.status(200).json({
        message : "Logged Out Successfully"
     })
}