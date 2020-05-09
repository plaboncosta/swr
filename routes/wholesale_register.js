const express = require('express');
const WholesaleRegister = require('../models/wholesale_registers');
const {v4: uuidv4} = require('uuid');
const router = express.Router();


// @route GET api/wholesale/register/by/token
// @desc Populate Wholesale Register Form By Token
// @access private
router.post('/by/token', async (req, res) => {
    try {
        const {token} = req.body;
        
        const wholesale_register = await WholesaleRegister.findOne({token});
        return res.status(200).json(wholesale_register);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});



// @route GET api/wholesale/register/create
// @desc Wholesale Register Route
// @access private
router.post('/create', async (req, res) => {
    try {
        const {required_optional, show_hide} = req.body;
        const token = uuidv4();
        
        const newWholesaleRegister = {
            required_optional,
            show_hide,
            token
        };
        
        const wholesale_register = new WholesaleRegister(newWholesaleRegister);
        await wholesale_register.save();
        
        return res.status(200).json({msg: `New Wholesale Register Form Saved Successfully. Your Token is ${token}`, success: true});
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});


module.exports = router;