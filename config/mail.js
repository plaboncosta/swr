const nodemailer = require('nodemailer');

exports.gmailTransporter = nodemailer.createTransport({
                                                   service : 'gmail',
                                                   auth    : {
                                                       user : process.env.SEND_EMAIL,
                                                       pass : process.env.SEND_EMAIL_PASSWORD
                                                   }
                                               });
