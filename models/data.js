'use strict'

const mongoose = require ('mongoose')

const data = new mongoose.Schema({ //schema db
  letter: String,
  frequency: Number
});

module.exports = mongoose.model('Data', data);
