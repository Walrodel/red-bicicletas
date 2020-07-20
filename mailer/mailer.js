var nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jerrod.stark@ethereal.email',
        pass: 'YDW98aV9cXb5YHQjsS'
    }
};

module.exports = nodemailer.createTransport(mailConfig);