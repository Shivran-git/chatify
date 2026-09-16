import jwt from 'jsonwebtoken' ;
import User from '../models/User.js';

export const socketAuthMiddleware = async(socket, next) => {
      try{
        // extract the token from the http-only cookie 
      const token = socket.handshake.headers.cookie
      ?.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1] ;

      if(!token){
        console.log("No token provided");
        return next(new Error("Unathourized- No Token Provided ."))
      }
// verify the token 
const decoded = jwt.verify(token, process.env.JWT_SECRET);
if(!decoded){
    console.log("Socket connection rejected : Invalid token");
    return next(new Error("Unathorized - Invalid token ."))
}

const user = await User.findById(decoded.userId).select("-password");
if(!user){
    console.log("Socket connection rejected - No user found .");
    return next(new Error("User not found .")) ;
}

  socket.user = user ;
  socket.userId = user._id.toString();

  console.log(`Socket authenticated : ${user.fullName} , the id is : ${user._id}`);
  next();
      }catch(error){
        console.log("Error in socket authentication :", error.message);
        next(new Error("Unauthorized = Authentication failed .")) ;

      }
}

