var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cors = require('cors');


var user = require('./routes/user');
var data = require('./routes/data');
var datadate = require('./routes/datadate');
var maps = require('./routes/maps');

var app = express();

mongoose.connect('mongodb://localhost/resfuldb', function(err, res){
  if (err){
    console.log('gagal konek ke database', err);
  }else{
    console.log('sukses bro');
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '=');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/user', user);
app.use('/api/data', data);
app.use('/api/datadate', datadate);
app.use('/api/maps', maps);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
