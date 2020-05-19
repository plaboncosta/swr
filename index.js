const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const cookie = require('cookie');
const nonce = require('nonce');
const request = require('request-promise');
const app = express();
require('dotenv').config();
require('./config/db');

const port = process.env.PORT || 5000;
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_SECRET_KEY;
const forwardingAddress = "https://bbd73dc1.ngrok.io";

const scopes = ['read_content', 'write_content', 'read_themes', 'write_themes', 'read_products', 'write_products',
    'read_product_listings', 'read_customers', 'write_customers', 'read_orders', 'write_orders',
    'read_orders', 'write_orders', 'read_draft_orders', 'write_draft_orders', 'read_inventory', 'write_inventory',
    'read_locations', 'read_script_tags', 'write_script_tags', 'read_fulfillments', 'write_fulfillments',
    'read_assigned_fulfillment_orders', 'write_assigned_fulfillment_orders', 'read_merchant_managed_fulfillment_orders', 'write_merchant_managed_fulfillment_orders',
    'read_third_party_fulfillment_orders', 'write_third_party_fulfillment_orders', 'read_shipping', 'write_shipping',
    'read_analytics', 'read_checkouts', 'write_checkouts', 'read_reports', 'write_reports',
    'read_price_rules', 'write_price_rules', 'read_discounts', 'read_discounts', 'read_marketing_events', 'write_marketing_events',
    'read_resource_feedbacks', 'write_resource_feedbacks', 'read_shopify_payments_payouts', 'read_shopify_payments_disputes',
    'read_translations', 'write_translations', 'read_locales', 'write_locales'];


// Initialize Middleware
app.use(express.json({extended: false}));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded());


// Initialize Session
app.use(session({
    secret: 'shopify-wholesale-register',
    saveUninitialized: false,
    resave: false
}));


// Initialize Router
const User = require('./routes/user');
const Customer = require('./routes/customer');
const WholesaleRegister = require('./routes/wholesale_register');
const Mail = require('./routes/mail');


// Router Declaration
app.get('/', (req, res) => res.send('Hello Shopify Wholesale Register App.'));
app.get('/shopify', (req, res) => {
    const shop = req.query.shop;
    if (shop) {
        const state = nonce();
        const redirectUri = forwardingAddress + '/shopify/callback';
        const installUrl = 'https://' + shop +
            '/admin/oauth/authorize?client_id=' + apiKey +
            '&scope=' + scopes +
            '&state=' + state +
            '&redirect_uri=' + redirectUri;

        res.cookie('state', state);
        res.redirect(installUrl);
    } else {
        return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
});
app.get('/shopify/callback', (req, res) => {
    const {shop, hmac, code, state} = req.query;
    if (!state) {
        return res.status(403).send('Request origin cannot be verified');
    }

    if (shop && hmac && code) {
        const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
        const accessTokenPayload = {
            client_id: apiKey,
            client_secret: apiSecret,
            code,
        };

        request.post(accessTokenRequestUrl, {json: accessTokenPayload})
            .then((accessTokenResponse) => {
                console.log(accessTokenResponse);
                req.session.access_token = accessTokenResponse.access_token;

                return res.redirect('/');
            })
            .catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
            });
    }
});
app.use('/api/user', User);
app.use('/api/customer', Customer);
app.use('/api/wholesale/register', WholesaleRegister);
app.use('/api/mail', Mail);



// Server Call
app.listen(port, () => {
    console.log(`Shopify Wholesale Register App running on port ${port}`);
    console.log(`http://localhost:${port}`);
});
