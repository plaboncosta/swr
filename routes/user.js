const express = require('express');
const User = require('../models/users');
const Status = require('../models/statuses');
const UserRole = require('../models/user_roles');
const router = express.Router();
const gmailTransporter = require('../config/mail').gmailTransporter;

// @route GET api/user/not/approve/all
// @desc Populate Not Approve User Data
// @access private
router.get('/not/approve/all', async (req, res) => {
    try {
        const users = await User.find().where('is_approve').equals(0);
        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});


// @route GET api/user/approve/all
// @desc Populate Approve User Data
// @access private
router.get('/approve/all', async (req, res) => {
    try {
        const users = await User.find().where('is_approve').equals(1);
        return res.status(200).json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});


// @route GET api/user/create
// @desc Register Route
// @access private
router.post('/create', async (req, res) => {
    try {
        const {first_name, last_name, email, phone, company, address1, address2, city, province, country, zip, details} = req.body;

        const status = await Status.findOne({code: "1"});
        const user_role = await UserRole.findOne({code: "3"});

        const newUser = {
            first_name,
            last_name,
            email,
            status,
            user_role
        };

        if (phone) Object.assign(newUser, {phone});
        if (company) Object.assign(newUser, {company});
        if (address1) Object.assign(newUser, {address1});
        if (address2) Object.assign(newUser, {address2});
        if (city) Object.assign(newUser, {city});
        if (province) Object.assign(newUser, {province});
        if (country) Object.assign(newUser, {country});
        if (zip) Object.assign(newUser, {zip});
        if (details) Object.assign(newUser, {details});

        const user_exist = await User.findOne({email});
        if (user_exist) return res.status(400).json({msg: 'User\'s already exists!', error: true});

        const user = new User(newUser);
        await user.save();

        return res.status(200).json({msg: 'New User created Successfully!', success: true});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});


// @route GET api/user/delete/:id
// @desc Delete User
// @access private
router.get('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        
        const user_exist = await User.findOne({_id: id});
        if (!user_exist) return res.status(400).json({msg: 'User didn\'t found!', error: true});
    
        const info = {
            from    : process.env.SEND_EMAIL,
            to      : user_exist.email,
            subject : "Account Declined",
            html    : `
                <h4>Hi ${user_exist.first_name},</h4>
                <p>We are very much sorry for declining your account.</p>
                <br>
                <p>Regards</p>
                <p>Shopify Wholesale Register App Team.</p>
            `
        };
        await gmailTransporter.sendMail(info);
        
        const status = await User.findOneAndDelete({_id: id});
        if(!status) return res.status(400).json({msg: 'Please try again with full information!'});
        
        return res.status(200).json({msg: 'User Deleted Successfully!', success: true});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});


module.exports = router;