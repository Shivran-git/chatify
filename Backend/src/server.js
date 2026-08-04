import express from 'express';
import path from "path";
import { PORT } from './Configurations/serverConfig.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js'
const app = express();

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

app.listen(PORT || 3000, ()=>{
    console.log("server is started. ");
})