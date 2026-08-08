import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.login.js';
import { logout } from '../controllers/auth.logout.js';
import { protectRouter } from '../middleware/protectRouter.js';
import { updateProfile } from '../controllers/auth.updateProfile.js';
import { arcjetProtection } from '../middleware/arcjet.js';


const router = express.Router();

router.use(arcjetProtection); // if this runs correctly then we can go to signup/login etc...

router.post('/signup',  signup)

router.post('/login',  login )

router.post('/logout', logout)

router.put('/update', protectRouter, updateProfile );
router.get('/check', protectRouter, (req,res)=>{return res.status(200).json(req.user)} )
export default router;