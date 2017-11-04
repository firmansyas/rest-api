'use strict'

const mongoose = require ('mongoose')

const user = new mongoose.Schema({ //schema db
  email: String,
  password: String
});

module.exports = mongoose.model('User', user);
