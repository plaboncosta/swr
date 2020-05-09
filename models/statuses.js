const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Create Status Schema
const StatusSchema = new Schema({
                                    name       : {
                                        type : String
                                    },
                                    code       : {
                                        type : String
                                    },
                                    created_at : {
                                        type    : Date,
                                        default : Date.now
                                    }
                                });

module.exports = Status = mongoose.model('statuses', StatusSchema);