//--------------- CONFIGURE VARIABLES ---------------//
var express = require('express');
var expressSession = require('express-session')
var mongoose = require('mongoose');
var app = express();
var api = require('./api');

var exphbs  = require('express-handlebars');
var passport = require('passport');
var authentication = require('./config/passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
// var nodemailer = require('nodemailer');
// Define multer settings (for multi-form file uploading) //
// TODO: move multer settings into config/ folder
// TODO: test file limitations
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ '_' +file.originalname)
  },
  limits : {fileSize: 1000000, files:5},
});
var upload = multer({ storage: storage })


//-------- CONFIGURE DB, VIEW ENGINE, & AUTH  --------//
// TODO: update db name to final site's name
mongoose.Promise = global.Promise; // promises set up; mongoose's are deprecated
mongoose.connect('mongodb://127.0.0.1/sellit'); // connect to the database

app.engine('handlebars', exphbs({defaultLayout: 'main'})); // set up view engine
app.set('view engine', 'handlebars');

authentication.defineLocalStrategy(passport); // passportjs configuration


//--------------- CONFIGURE MIDDLEWARE ---------------//
app.use('/assets', express.static(path.join(__dirname, 'static'))); // define public path location
app.use(logger('dev')); // records client requests -> server, via console.log()
app.use(cookieParser()); // read cookies, needed for authentication
app.use(bodyParser.json()); // parse through html forms
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressSession({resave: false, saveUninitialized: false, secret: 'sellit, TOlist or listTO?'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){ // define variables to pass to client
  res.append('authorized_user', (req.user) ? true : false);
  next();
})


//----------------- CONFIGURE ROUTING -----------------//
// GET requests
app.get('/', function(req, res){
  res.render('home');
});
app.get(['/create-post', '/my-posts', '/my-account'], function(req, res){
  if (req.isAuthenticated())
    res.render('home');
  else
    res.redirect('/');
});

app.get('/post/:type', api.getPostByType)
app.get('/paginatePosts/:pageNum', api.paginatePosts);
app.get('/post/:id', api.getPostByID);
app.get('/user/:id', api.getUserByID);
app.get('/searchPosts/:searchText/:page', api.searchPosts);
app.get('/postsByOwner', api.postsByAuthenticatedOwner);
app.get('/postsByOwner/:id', api.postsByOwnerID);
app.get('/postByTitle/:title', api.getPostByTitle);
app.get('/userByEmail/:email', api.getUserByEmail);
app.get('/varifyAuthentication', api.varifyAuthentication);
app.get('/myAccount', function(req, res){
  if (req.isAuthenticated())
    res.status(200).send({message: 'User is logged in!'});
  else
    res.redirect('/');
});
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.get('*', function(req, res){
  res.render('home');
});

app.get('/reset/:token', api.getReset);
app.post('/forgot', api.sendResetEmail);
app.post('/reset/:token', api.postReset);

// POST requests
app.post('/createPost', upload.any(), api.createPost);
app.post('/createUser', upload.any(), api.createUser);
app.post('/login', function(req, res){ authentication.handleLogin(req, res, passport);});
app.post('/send', api.send);

// PUT requests
app.put('/user', api.updateUserInfo);
app.put('/post/:id', api.updatePostInfo);

// DELETE requests
app.delete('/user/:id', api.deleteUser);
app.delete('/post/:id', api.deletePost);

// Start up server
app.listen(8080, function(){
  console.log('Server running on port: 8080');
});