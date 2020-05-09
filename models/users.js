const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
                                  first_name  : {
                                      type     : String,
                                      required : true
                                  },
                                  last_name   : {
                                      type     : String,
                                      required : true
                                  },
                                  email       : {
                                      type     : String,
                                      required : true
                                  },
                                  phone       : {
                                      type : String
                                  },
                                  company     : {
                                      type : String
                                  },
                                  address1    : {
                                      type : String
                                  },
                                  address2    : {
                                      type : String
                                  },
                                  city        : {
                                      type : String
                                  },
                                  province    : {
                                      type : String
                                  },
                                  country     : {
                                      type : String
                                  },
                                  zip         : {
                                      type : String
                                  },
                                  description : {
                                      type : String
                                  },
                                  status      : {
                                      id   : {
                                          type : Schema.Types.ObjectId,
                                          ref  : 'statuses'
                                      },
                                      name : {
                                          type : String
                                      },
                                      code : {
                                          type : String
                                      }
                                  },
                                  user_role   : {
                                      id   : {
                                          type : Schema.Types.ObjectId,
                                          ref  : 'user_roles'
                                      },
                                      name : {
                                          type : String
                                      },
                                      code : {
                                          type : String
                                      }
                                  },
                                  is_approve: {
                                      type: Number,
                                      default : 0
                                  },
                                  created_at  : {
                                      type    : Date,
                                      default : Date.now
                                  }
                              });

module.exports = User = mongoose.model('users', UserSchema);