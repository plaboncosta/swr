const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Create User Role Schema
const UserRoleSchema = new Schema({
                                      name        : {
                                          type : String
                                      },
                                      description : {
                                          type : String
                                      },
                                      code        : {
                                          type : String
                                      },
                                      created_at  : {
                                          type    : Date,
                                          default : Date.now
                                      }
                                  });

module.exports = UserRole = mongoose.model('user_roles', UserRoleSchema);