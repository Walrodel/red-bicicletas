var nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
let mailConfig;

if(process.env.MODE_ENV === 'production'){
    const optionts = {
        auth: {
            api_key: process.env.SENDGRID_API_SECRET
        }
    }
    mailConfig = sgTransport(optionts);
}else{
    if(process.env.MODE_ENV === 'starging'){
        const optionts = {
            auth: {
                api_key: process.env.SENDGRID_API_SECRET
            }
        }
        mailConfig = sgTransport(optionts);
    } else {
        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.user_ethereal,
                pass: process.env.password_ethereal
            }
        };
    }
}

module.exports = nodemailer.createTransport(mailConfig);