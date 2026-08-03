import express from 'express';
const router = express.Router();

router.get('/signup', (req, res)=>{
    res.send("yOU ARE ON A SIGNUP PAGE");
})

router.get('/login', (req, res)=>{
    res.send("yOU ARE ON A login PAGE");
})

router.get('/logout', (req, res)=>{
    res.send("yOU ARE ON A logout PAGE");
})


export default router;