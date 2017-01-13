var express = require('express');
var logger = require('morgan'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var mongoose = require('mongoose');
var Post = require('./models/post');
var User = require('./models/user');

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
app.get('/getByTitle', function(req, res){
    res.send('Got a GET request');

    Post.findOne({'title': 'Brake'}, 'title address description date', function(err, post) {
      console.log(post.description + " was created on: " + post.date);
    });
});

// POST request
app.post('/', function (req, res) {
  res.send('Got a POST request')
});

app.post('/createPost', function(req, res){
  res.send('Received JSON data!');

  var newPost = {
    title: req.body.title,
    address: req.body.address,
    description: req.body.description
  };

  //create new database entry from POST request's JSON object
  Post.create(newPost, function(err, results){
    if (err) console.log(err);
    console.log('Successfully uploaded new post');

    //retrieve new db object & log its attributes to console
    Post.findOne({'title': newPost.title}, 'title address description date', function(err, post) {
      if (err) return handleError(err);

      console.log(post.title);
      console.log(post.address);
      console.log(post.date);
      console.log(post.description);
    });
  });

});

//Put request to /user
app.put('/user/:id', function(err, res){
  res.send('Got a put request at /user');
  User.findByIdAndUpdate({_id: req.params.id}, {$set: {phone: req.body.phone}}, {new: true}, function(err, User) {
    if(err) return handleError(err);
    Console.log('Update user phone number successful');
  });
});

// PUT request to /post
app.put('/post/:id', function (req, res) {
  res.send('Got a PUT request at /post');
  Post.findByIdAndUpdate({_id: req.params.id}, {$set: {title: req.body.title}}, {new: true}, function(err, Post) {
  if (err) return handleError(err);
  console.log('Update post title successful!');
  //res.send(Post);
  });
});

// DELETE request to /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
  User.findOneAndRemove({'_id': req.params.id}, function(err, result){
    if(err) return handleError(err);
    console.log('Delete user successful!');
  });
});

// DELETE request to /post
app.delete('/post/:id', function (req, res) {
  res.send('Got a DELETE request at /user');
  Post.findOneAndRemove({'_id': req.params.id}, function(err, result){
    if(err) return handleError(err);
    console.log('Delete post successful!');
  });
});

app.listen(3000, function(){
  console.log('Server running on port: 3000');
})
