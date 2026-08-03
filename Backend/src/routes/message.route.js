import express from 'express';
const router = express.Router();

router.get('/send', (req, res)=>{
    res.send("Sending the message .")
})

export default router;