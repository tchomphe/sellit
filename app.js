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

mongoose.connect('mongodb://localhost/sellit');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var postSchema = new Schema({
  title:  String,
  address: String,
  date: { type: Date, default: Date.now },
  type: String,
  description: String,
  username: {type: ObjectId, ref: 'user'}
});

var userSchema = new Schema({
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

//create Models for User and Post
var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);

//instantiate seed data
var user = {
  name: {
    first: 'John',
    last: 'Connor'
  },
  phone: 1234,
  username: 'theRealConner',
  password: 'theRealPW',
  email: 'conner@skynet.com'
};
var posts = [
  {
    title: 'Samsung Galaxy S5',
    address: 'L2L 1Z9',
    type: 'Smart Phone'
    //username: 'theRealConner'
  },
  {
    title: 'HTC One',
    address: 'A9A F3F',
    type: 'Phone'
    //username: 'theRealConner'
  }
];

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

// PUT request
app.put('/user', function (req, res) {
  //upload seed data into MongoDB
  User.create(user, function(err, results){
    if (err) console.log(err);
      console.log('Successfully added seed user');
  });
  Post.create(posts, function(err, results){
    if (err) console.log(err);
    console.log('Successfully added seed posts');
  });


  res.send('Got a PUT request at /user')
});

// DELETE request
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
});

app.listen(3000, function(){
  console.log('Server running on port: 3000');
})
