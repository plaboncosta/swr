const Shopify = require('shopify-api-node');
const shopify = new Shopify({
                                shopName    : process.env.SHOP,
                                accessToken : process.env.ACCESS_TOKEN
                            });

module.exports = shopify;