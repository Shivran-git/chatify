import express from 'express';
import path from "path";
import { PORT } from './Configurations/serverConfig.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js'
import { ConnectDb } from './Configurations/db.js';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import cloudinary from './Configurations/coudinary.js';
import { app, server } from './utils/socket.js';


app.use(express.json({ limit : "10mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin : process.env.CLIENT_URL, credentials : true}))

const __dirname = path.resolve();
console.log(__dirname);
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
    });
}
async function checker(){
try {
  console.log(process.env.CLOUDINARY_CLOUD_NAME)
  const result = await cloudinary.api.ping();
  console.log("Cloudinary connected:", result);
} catch (error) {
  console.error("Cloudinary connection failed:", error.message);
}
}
server.listen(process.env.PORT || 3000, ()=>{
    console.log("server is started. ");
    ConnectDb();
    checker();
})