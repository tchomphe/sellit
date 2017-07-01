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

passport.use(new LocalStrategy({
    // define parameters in req.body passportjs defines as username and password
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done){
    User.findOne({ email:username }, function(err, user){
      if(err) { return done(err); }
      if(!user) { return done(new Error('User Not Found!')); }
      if(!user.validPassword(password)) { return done(new Error('Invalid Password!')); }

      return done(null, username, 'Authentication Passed');
    });
  }
));

// GET requests
app.get(['/', '/create-post'], function(req, res){
  res.render('home');
});

app.get('/paginatePosts/:pageNum', api.paginatePosts);
app.get('/post/:id', api.getPostByID);
app.get('/user/:id', api.getUserByID);
app.get('/searchByTitle/:title', api.searchByTitle);
app.get('/postByTitle/:title', api.getPostByTitle);
app.get('/userByEmail/:email', api.getUserByEmail);

// POST requests
app.post('/createPost', upload.array('postImages'), api.createPost);
app.post('/createUser', upload.array('userImages'), api.createUser);
app.post('/login', function(req, res, next){
  console.log('Received login Request...');
  console.log(req.body);

  if (req.body.email){
    passport.authenticate('local', function(err) {
      console.log('Processed login Request.....');
      if (err) {
        console.log('ERROR: ' + err.message);
        return res.status(400).send({error: err.message});
      }

      //TODO: log user in, potentially with req.logIn(user, func)
      console.log('SUCCESS: ' + req.body.email + ' has been logged in.');
      return res.redirect('/create-post');
    })(req, res, next);
  }
  else{
    console.log('ERROR: Body email field is null');
    return res.redirect('/');
  }
});

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