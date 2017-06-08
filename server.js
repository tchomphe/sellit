var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var mongoose = require('mongoose');
var api = require('./api');
var exphbs  = require('express-handlebars');
var multer = require('multer');


var User = require('./models/user');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

var app = express();

// Define multer settings
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '_' + Date.now())
  },
  limits : {fileSize: 1000000, files:5},
});
var upload = multer({ storage: storage })

// Logger to print request/response to server
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Setting middleware path location
app.use('/assets', express.static(path.join(__dirname, 'static')));

// Set up view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Connect to the database
mongoose.connect('mongodb://127.0.0.1/sellit');

passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({ username:username }, function(err, user){
      if(err) {
        // console.log('Error! ' + err);
        return done(err); }
      if(!user) {
        // console.log('User not found');
        return done(null, false, {message: 'Incorrect username'});
      }
      if(!user.validPassword(password)){
        // console.log('Invalid PW');
        return done(null, false, {message: 'Incorrect password'});
      }
      // console.log('Username: ' + username + ', password: ' + password);
      return done(null, user);
    });
  }
));

// GET requests
app.get('/', function(req, res){
  res.render('home');
});

app.get('/paginatePosts/:pageNum', api.paginatePosts);
app.get('/post/:id', api.getPostByID);
app.get('/user/:id', api.getUserByID);
app.get('/postByTitle/:title', api.getPostByTitle);
app.get('/userByUsername/:username', api.getUserByUsername);

// POST requests
app.post('/createPost', upload.array('postImage'), api.createPost);
app.post('/createUser', api.createUser);
app.post('/login', passport.authenticate('local', function(req, res){
  console.log('Passport authentication passed!');
  //res.redirect('/login/success');
}));
app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

// PUT requests
app.put('/user/:id', api.updateUserInfo);
app.put('/post/:id', api.updatePostInfo);

// DELETE requests
app.delete('/user/:id', api.deleteUser);
app.delete('/post/:id', api.deletePost);

// Start up server
app.listen(8080, function(){
  console.log('Server running on port: 8080');
})