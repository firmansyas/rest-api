'use strict'

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const checker = require('../helpers/checker');


router.get('/', function(req, res, next) {
  User.find(function(err, user){
    if(err){
      res.json({'ERROR': err})
    }else{
      res.json(user)
    }
  })
});


router.post('/login', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user){
    if(err) throw err;
    if(!user){ //jika bukan email yang dimasukkan salah
      res.json({success: false, message: 'Authentication failed. Email is not found.'});
    }else{
      if(user.password !== req.body.password){ //jika passwordnya salah
        res.json({success: false, message: 'Authentication failed. Wrong password.'});
      }else{
        let token = jwt.sign({id: user._id, email: user.email}, config.secretkey, {
          expiresIn: 86400 //seharian
        })
        res.json({
          data: {email: user.email},
          token: token
        })
      }
    }
  })
});

router.post('/register', function (req, res, next) {
  User.find({ email: req.body.email}, function(err, user) {
    if(user.length > 0) {
      return res.json({message: "email already exist"})
    }
    if (req.body.password == req.body.retypepassword) {
      let user = new User({
        email: req.body.email,
        password: req.body.password
      })
      let token = jwt.sign({id: user._id, email: user.email}, config.secretkey, { //dapetin token nya
        expiresIn: 86400 //token akan berlaku seharian
      })
      user.save(function (err, data) {
        if(err) {
          res.json(err)
        } else {
          res.json({
            data: {email: user.email},
            token: token
          })
        }
      })
    }
  })
});

router.post('/check', checker, function(req, res, next){
  let token = req.body.token;
  if(token){
    jwt.verify(token, config.secretkey, function(err, decoded){
      if(err){
        return res.json({valid: false});
      }else{
        return res.json({valid: true});
      }
    })
  }else{
    return res.json({success: false, message: 'failed to authenticate, token is undefined'});
  }
})

router.get('/destroy', checker, function(req, res, next) {
  res.json({logout: true});
})

module.exports = router;
