const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SEND_EMAIL,
        pass: process.env.SEND_EMAIL_PASSWORD
    }
});

const info = {
    from: process.env.SEND_EMAIL, 
    to: 'plabonjosephcosta@gmail.com', 
    subject: "Hello ✔", 
    text: "Hello world?",
    html: "<b>Hello world?</b>" 
  };


// @route GET api/mail/send
// @desc Send a test email
// @access private
router.get('/send', async (req, res) => {
    try {
        // return res.send('hello test');
        const payload = await transporter.sendMail(info);
        return res.status(200).json(payload);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});


module.exports = router;