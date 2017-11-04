'use strict'

const express = require('express');
const router = express.Router();
const Maps = require('../models/maps');
const jwt = require('jsonwebtoken');
const config = require('../config');
const checker = require('../helpers/checker');

//ADD
router.post('/', function (req, res) {
  let maps = new Maps({
    tittle: req.body.title,
    lat: req.body.lat,
    lng: req.body.lng
  })
  maps.save(function (err, addMaps) { //add data (query)
    if(err){
      res.json({"Error bro": err})
    }else{
      res.json({success: true, message: "data have been added", maps: addMaps})
    }
  })
});

//READ
router.get('/', function (err, maps) {
  Maps.find(function (err, maps) {
    if (err){
      res.json({'ERROR BRO': err})
    } else {
      res.json(maps)
    }
  })
})

module.exports = router;
