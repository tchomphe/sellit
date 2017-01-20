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

// GET request
app.get('/getByTitle', api.getPostByTitle);
app.get('/getUsername/:id', api.getUsernameByID);

// POST request
app.post('/', function (req, res) {
  res.send('Got a POST request')
});

app.post('/createPost', api.createPost);

//Put request to /user
app.put('/user/:id', api.updateUserInfo);

// PUT request to /post
app.put('/post/:id', api.updatePostInfo);

// DELETE request to /user
app.delete('/user', api.deleteUser);

// DELETE request to /post
app.delete('/post/:id', api.deletePost);

app.listen(3000, function(){
  console.log('Server running on port: 3000');
})
