import nodemailer from 'nodemailer';
import { configsApp } from '~/configs';

export const transport = nodemailer.createTransport({
     // service: 'gmail',
     from: configsApp.mail.userMail,
     host: '0.0.0.0',
     port: 1025,
     auth: {
          user: configsApp.mail.userMail,
          pass: configsApp.mail.mailpassword,
     },
});
