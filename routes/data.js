'use strict'

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Data = require('../models/data');
const jwt = require('jsonwebtoken');
const config = require('../config');
const checker = require('../helpers/checker');

//ADD
router.post('/', function (req, res) {
  let data = new Data({
    letter: req.body.letter,
    frequency:req.body.frequency
  })
  data.save(function (err, addData) { //add data (query)
    if(err){
      res.json({"Error bro": err})
    }else{
      res.json({success: true, message: "data have been added", data: addData})
    }
  })
});

//READ
router.get('/', function(req, res) {
  Data.find(function(err, data){
    if(err){
      res.json({'ERROR': err})
    }else{
      res.json(data)
    }
  })
});

//EDIT
router.put('/:id', function (req, res) {
  Data.findById(req.params.id, function (err, data) { //updated data (query)
    if (err) {
      res.json({'Error bro': err})
    } else {
      data.letter = req.body.letter;
      data.frequency = req.body.frequency;
      data.save(function (err) {
        if(err){
          res.json({'Error bro': err});
        }else{
          res.json({success: true, message: "data have been updated", data: data})
        }
      })
    }
  })
})

//DELETE
router.delete('/:id', function (req, res) {
  Data.findById(req.params.id, function (err, data) { //delete data (query)
    if(err){
      res.json({'Error bro': err})
    } else {
      data.remove(function (err) {
        if (err){
          res.json({'gagal hapus bro': err})
        } else{
          res.json({success: true, message: "data have been deleted", data: data})
        }
      })
    }
  })
})

//FIND
router.get('/:id', function (req, res) {
  Data.findById(req.params.id, function(err, data){ //finding data (query)
    if(err){
      res.json({'Error bro': err})
    } else{
      res.json({success: true, message: "data found nih", data: data})
    }
  })
})

//SEARCH
router.post('/search', function (req, res) {
  let searchData = {};
  let letter = req.body.letter;
  let frequency = Number(req.body.frequency);

  if(req.body.letter){
    searchData['letter'] = letter;
  }
  if(req.body.frequency){
    searchData['frequency'] = frequency;
  }
  if(letter.length > 0){
    res.json("Data letter not found")
  }
  if(frequency.length > 0){

  }  else{
    Data.find(searchData, function(err, dataSearch){
      res.json(dataSearch)
    })
  }
})



module.exports = router;
