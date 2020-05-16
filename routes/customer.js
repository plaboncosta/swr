const express          = require('express');
const router           = express.Router();
const shopify          = require('../config/shopify-api');
const User             = require('../models/users');
const Status           = require('../models/statuses');
const gmailTransporter = require('../config/mail').gmailTransporter;

// Get All Customer
// uri = api/customer/all
router.get('/all', async (req, res) => {
    try {
        const customers = await shopify.customer.list();
        return res.status(200).json(customers);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

// Create Customer
// uri = api/customer/create
router.post('/create', async (req, res) => {
    try {
        const {_id, first_name, last_name, email, phone, company, address1, address2, city, province, country, zip, tags} = req.body;
        const newCustomer                                                                                                 = {
            first_name,
            last_name,
            email
        };
        
        const addresses = [];
        const address   = {
            first_name,
            last_name,
            country_code          : 'BD',
            password              : '12345678',
            password_confirmation : '12345678',
            send_email_welcome    : ''
        };
        
        if (phone) Object.assign(address, {phone});
        if (company) Object.assign(address, {company});
        if (address1) Object.assign(address, {address1});
        if (address2) Object.assign(address, {address2});
        if (city) Object.assign(address, {city});
        if (province) Object.assign(address, {province});
        if (country) Object.assign(address, {country});
        if (zip) Object.assign(address, {zip});
        addresses.push(address);
        
        if (phone) Object.assign(newCustomer, {phone});
        if (tags) Object.assign(newCustomer, {tags : tags.length > 0 ? tags.join(',') : ''});
        Object.assign(newCustomer, {addresses});
        
        const customer_exist = await shopify.customer.search({email});
        if (customer_exist.length > 0) return res.status(400).json({msg : 'Customer Already Exists!', error : true});
        
        const status         = await shopify.customer.create(newCustomer);
        const approve_status = await Status.findOne({code : "3"});
        const update_user    = await User.findByIdAndUpdate(_id, {is_approve : 1, status : approve_status});
        
        const info = {
            from    : process.env.SEND_EMAIL,
            to      : email,
            subject : "Account Approved",
            html    : `
                <h4>Hi ${first_name},</h4>
                <p>We have approved your account. You can now login on our store.</p>
                <br>
                <p>Regards</p>
                <p>Shopify Wholesale Register App Team.</p>
            `
        };
        if (update_user) await gmailTransporter.sendMail(info);
    
        const replyInfo = {
            from    : process.env.SEND_EMAIL,
            to      : process.env.SEND_EMAIL,
            subject : "Account Approval Confirmation",
            html    : `
                <p>New Customer (${first_name} ${last_name}) approved successfully.</p>
                <br>
                <p>Regards</p>
                <p>Shopify Wholesale Register App Team.</p>
            `
        };
        if (update_user) await gmailTransporter.sendMail(replyInfo);
        
        
        if (status) return res.status(200).json({msg : 'New User approved successfully!', success : true});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

module.exports = router;