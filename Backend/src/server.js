import express from 'express';
import path from "path";
import { PORT } from './Configurations/serverConfig.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js'
import { ConnectDb } from './Configurations/db.js';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express();
app.use(express.json({ limit : "10mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is started. ");
    ConnectDb();
})