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
    title: req.body.title,
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
router.get('/', function (req, res) {
  Maps.find(function (err, maps) {
    if(maps.length == 0){
      res.json({message: "Data not Found"})
    } else if (err){
      res.json({'ERROR BRO': err})
    } else {
      res.json(maps)
    }
  })
})

//EDIT
router.put('/:id', function(req, res) {
  Maps.findById(req.params.id, function (err, maps) {
    if(err){
      res.json({'Error nih': err})
    } else {
      maps.title = req.body.title;
      maps.lat = req.body.lat;
      maps.lng = req.body.lng;
      maps.save(function (err) {
        if (err){
          res.json({'Error bro': err})
        }else {
          res.json({success: true, message: "data have been updated", maps: maps})
        }
      })
    }
  })
})

//FIND
router.get('/:id', function (req, res) {
  Maps.findById(req.params.id, function (err, maps) {
    if(err){
      res.json({'Error bro': err})
    } else {
      res.json({success: true, message: "data found", maps: maps})
    }
  })
})

//DELETE
router.delete('/:id', function (req, res) {
  Maps.findById(req.params.id, function (err, maps) {
    if (err) {
      res.json({'Error bro': err})
    } else {
      maps.remove(function (err) {
        if(err){
          res.json({'gagal hapus nih': err})
        }else {
          res.json({success: true, message: "data have been deleted", maps: maps})
        }
      })
    }
  })
})

//SEARCH
router.post('/search', function (req, res) {
  let searchMaps = {};
  let title = req.body.title;
  let lat = Number(req.body.lat);
  let lng = Number(req.body.lng);

  if(req.body.title){
    searchMaps['title'] = title; //data title di push ke object (searchMaps)
  }

  if (req.body.lat){
    searchMaps['lat'] = lat; //data lat di push ke object (searchMaps)
  }

  if (req.body.lng){
    searchMaps['lng'] = lng; //data lng di push ke object (searchMaps)
  } else {
    Maps.find(searchMaps, function (err, mapsSearch) { //fungsi untuk mencari semua data
      res.json(mapsSearch)
    })
  }
})



module.exports = router;
