'use strict'

const mongoose = require ('mongoose')

const maps = new mongoose.Schema({ //schema db
  title: String,
  lat: Number,
  lng: Number
});

module.exports = mongoose.model('Maps', maps);
