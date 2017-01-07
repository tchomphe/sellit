var express = require('express');
var logger = require('morgan'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// Logger to print request/response to server
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Setting middleware path location
app.use('/assets', express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var post = new Schema({
  title:  String,
  address: String,
  date: { type: Date, default: Date.now },
  type: String,
  description: String,
  hasAttachment: Boolean,
  //img: { data: Buffer, contentType: String },
  //username: [{type: ObjectId, ref: 'user'}]
});

var user = new Schema({
  name: {
      first: { type: String, required: true, trim: true},
      last: { type: String, required: true, trim: true}
  },
  phone: Number, 
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email:  {type: String, required: true, unique: true},
  //posts:[{type: ObjectId, ref: 'post'}]
});


// GET request
app.get('/', function(req, res){
    res.send('Got a GET request');
});

// POST request
app.post('/', function (req, res) {
  res.send('Got a POST request')
});

// PUT request
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
});

// DELETE request
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
});

app.listen(3000, function(){
  console.log('Server running on port: 3000');
})
