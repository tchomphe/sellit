var express = require('express');
var logger = require('morgan'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var mongoose = require('mongoose');
var api = require('./api');

var app = express();

// Logger to print request/response to server
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Setting middleware path location
app.use('/assets', express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/sellit');

// GET requests
app.get('/getByTitle', api.getPostByTitle);

// POST requests
app.post('/createPost', api.createPost);

// PUT requests
app.put('/user/:id', api.updateUserInfo);
app.put('/post/:id', api.updatePostInfo);

// DELETE requests
app.delete('/user', api.deleteUser);
app.delete('/post/:id', api.deletePost);

app.listen(3000, function(){
  console.log('Server running on port: 3000');
})
