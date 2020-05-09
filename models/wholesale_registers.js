const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Create Wholesale Schema
const WholesaleRegisterSchema = new Schema({
                                               required_optional : {
                                                   type : Object
                                               },
                                               show_hide         : {
                                                   type : Object
                                               },
                                               token             : {
                                                   type : String
                                               },
                                               created_at        : {
                                                   type : Date,
                                                   default: Date.now
                                               }
                                           });

module.exports = WholesaleRegister = mongoose.model('wholesale_registers', WholesaleRegisterSchema);