import mongoose from "mongoose"
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);


export const ConnectDb = async ()=>{
    try{
 const conn = await mongoose.connect(process.env.MONGO_URI);
 console.log("MONGODB CONNECTED : ", conn.connection.host);
    }catch(error){
    console.log("can't connect to Database : ", error);
    process.exit(1);
    }
}