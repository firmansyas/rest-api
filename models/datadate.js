'use strict'

const mongoose = require ('mongoose')

const datadate = new mongoose.Schema({ //schema db
  letter: String,
  frequency: Number
});

module.exports = mongoose.model('Datadate', datadate);
