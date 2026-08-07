import {Resend} from 'resend';
import { createWelcomeEmailTemplate } from '../templates/emailTemplate.js';

const resend = new Resend(process.env.RESEND_API_KEY);
const name = process.env.EMAIL_FROM_NAME;
const emailAddress = process.env.EMAIL_FROM ;


export const mailSender = async (email, fullName)=>{
    const {data, error} = await resend.emails.send({
        from :  `${name}  <${emailAddress}>`,
        to : [email],
        subject : 'Welcome to Imessenger !',
        html : createWelcomeEmailTemplate(fullName)
    })
    if(error){
    throw error ;
}
}

