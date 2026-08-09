import express from 'express';
import { getAllContacts } from '../controllers/getAllContacts.js';
import { protectRouter } from '../middleware/protectRouter.js';
import { getMessagesByUserId } from '../controllers/getAllMessages.js';
import { sendMessage } from '../controllers/sendMessage.js';
import { getAllChats } from '../controllers/getAllChats.js';
import { arcjetProtection } from '../middleware/arcjet.js';

const router = express.Router();
router.use( protectRouter);

router.get('/contacts',  getAllContacts);
router.get('/chats',  getAllChats);
router.get('/:id',  getMessagesByUserId);
router.post('/send/:id', sendMessage);
export default router;