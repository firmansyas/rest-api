'use strict'

const express = require('express');
const router = express.Router();
const Datadate = require('../models/datadate')
const jwt = require('jsonwebtoken')
const config = require('../config')
const checker = require('../helpers/checker')

//ADD
router.post('/', function (req, res) {
  let datadate = new Datadate({
    letter: req.body.letter,
    frequency: req.body.frequency
  })
  datadate.save(function (err, adddataDate) { //add data date (query)
    if (err){
      res.json({'Error data': err})
    }else{
      res.json({success: true, message: "data have been added", datadate: adddataDate})
    }
  })
})

//READ
router.get('/', function (req, res) {
  Datadate.find(function (err, datadate) {
    if(err){
      res.json({'Error': err})
    }else{
      res.json(datadate)
    }
  })
})

//EDIT
router.put('/:id', function(req, res) {
  Datadate.findById(req.params.id, function (err, datadate) {
    if(err){
      res.json({'Error nih': err})
    } else {
      datadate.letter = req.body.letter;
      datadate.frequency = req.body.frequency;
      datadate.save(function (err) {
        if (err){
          res.json({'Error bro': err})
        }else {
          res.json({success: true, message: "data have been updated", datadate: datadate})
        }
      })
    }
  })
})

//DELETE
router.delete('/:id', function (req, res) {
  Datadate.findById(req.params.id, function (err, datadate) {
    if (err) {
      res.json({'Error bro': err})
    } else {
      datadate.remove(function (err) {
        if(err){
          res.json({'gagal hapus nih': err})
        }else {
          res.json({success: true, message: "data have been deleted", datadate: datadate})
        }
      })
    }
  })
})

//FIND
router.get('/:id', function (req, res) {
  Datadate.findById(req.params.id, function (err, datadate) {
    if(err){
      res.json({'Error bro': err})
    } else {
      res.json({success: true, message: "data found", datadate: datadate})
    }
  })
})

//SEARCH
router.post('/search', function (req, res) {
  let searchdataDate = {};
  let letter = req.body.letter;
  let frequency = req.body.frequency;

  if(req.body.letter){
    searchdataDate['letter'] = letter; //data letter di push ke object (searchdataDate)
  }
  if (req.body.frequency){
    searchdataDate['frequency'] = frequency; //data letter di push ke object (searchdataDate)
  }
  if (letter.length > 0){
    res.json({message: "Data letter not found'"})
  }
  if (frequency.length > 0){
    res.json({message: "Data frequency not found"})
  } else {
    Datadate.find(searchdataDate, function (err, datadateSearch) { //fungsi untuk mencari semua data
      res.json(datadateSearch)
    })
  }
})


module.exports = router;
