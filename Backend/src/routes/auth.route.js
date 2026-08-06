import express from 'express';
import { signup } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signup)

router.get('/login', (req, res)=>{
    res.send("yOU ARE ON A login PAGE");
})

router.get('/logout', (req, res)=>{
    res.send("yOU ARE ON A logout PAGE");
})


export default router;