import express from 'express';
import { PORT } from './Configurations/serverConfig.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js'
const app = express();

app.use('/api/auth', authRouter)

app.use('/api/messages', messageRouter);

app.listen(PORT || 3000, ()=>{
    console.log("server is started. ");
})