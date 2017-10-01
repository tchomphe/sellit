var mongoose = require('mongoose');
var Post = require('./config/models/post');
var User = require('./config/models/user');
var fs = require('fs');
var passport = require('passport');
var authentication = require('./config/passport');
var nodemailer = require('nodemailer');

/**
 * [Helper Function]: Varifies the success or failure of a MongoDB query
 * @param {Error} err
 * @param {Response} res
 * @param {String} funcName
 */
varifyQuerySuccess = function(err, res, funcName){
  if(err){
      res.status(500);
      console.log('ERROR in ' + funcName + ': ', err);
    }
    else{
      res.status(200);
      console.log('MongoDB query was successful.');
    }
}

/**
 * [Helper Function]: Varifies that the session owner (sending the request)
 *  is the rightful owner of the post they are attempting to modify
 * @param {Request} req
 */
varifyRightfulOwner = function(req, callback){
  //fetch the post's Owner ID from db
  Post.findOne({'_id': req.params.id}, 'ownerID', function(err, post){
    if (err) { console.log('ERROR in varifyRightfulOwner(): ' + err); }

    //compare session owner's ID vs posts's Owner ID; session owner should be post's owner
    if (req.user._id === post.ownerID.toString()) {
      callback(true); //session owner is authorized to edit
    }
    else {
      callback(false); //session owner is not authorized
    }
  });
}

//-------------------------- GET request --------------------------//
exports.paginatePosts = function(req, res){
  var query = {};
  var options = {
    page: req.params.pageNum,
    sort: { date: -1 },
    limit: 3
  };

  Post.paginate(query, options, function(err, result){
    console.log('Pagination success.');
    res.send(result);
  });
};

exports.searchPosts = function(req, res){
  //define query; search for all posts by default
  var query = { $text: { $search: req.params.searchText } };
  var options = {
    page: req.params.page,
    sort: { date: -1 },
    limit: 6
  }

  Post.paginate(query, options, function(err, result){
    console.log('Pagination success.');
    res.send(result);
  });
};

exports.postsByAuthenticatedOwner = function(req, res){
  if (req.isAuthenticated()){
    var query = { 'ownerID': mongoose.Types.ObjectId(req.user._id) };
    var sortOptions = { date: -1 };

    Post.find(query, null, {sort: sortOptions}, function(err, result){
      console.log('User posts found.');
      res.send(result);
    });
  }
  else {
    res.status(400).send({message: 'Please Log In.'});
  }
};

exports.postsByOwnerID = function(req, res){
  var query = { 'ownerID': mongoose.Types.ObjectId(req.params.id) };
  var sortOptions = { date: -1 };

  Post.find(query, null, {sort: sortOptions}, function(err, result){
    console.log('User posts found.');
    res.send(result);
  });

};

exports.getPostByTitle = function(req, res){
  Post.findOne({'title': req.params.title}, 'title type address description date', function(err, post) {
    varifyQuerySuccess(err, res, 'getPostByTitle');
    res.send(post);
  });
};

exports.getUserByID = function(req, res){
  User.findOne({'_id': req.params.id}, 'email nickname phone', function(err, user){
    varifyQuerySuccess(err, res, 'getUserByID');
    res.send(user);
  });
};

exports.getPostByID = function(req, res){
  Post.findOne({'_id': req.params.id}, 'title type address description date', function(err, post){
    varifyQuerySuccess(err, res, 'getPostByID');
    res.send(post);
  });
};

exports.getUserByEmail = function(req, res){
  User.findOne({'email': req.params.email}, 'email nickname phone date', function(err, user) {
    varifyQuerySuccess(err, res, 'getUserByEmail');
    res.send(user);
  });
};

exports.varifyAuthentication = function(req, res){
  if (req.isAuthenticated())
    res.append('user', [req.user.email, req.user.nickname, req.user.phone]).send();
  else
    res.send(null);
}

//-------------------------- POST request --------------------------//
exports.createUser = function(req, res){
  //validate phone number
  var phoneOK = /^\d{3}-\d{3}-\d{4}$/.test(req.body.phone);

  var newUser = {
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
    phone: (phoneOK) ? req.body.phone : null,
  };

  //create new database entry from POST request's JSON object
  User.saveNewUser(newUser, function(err, user){
    varifyQuerySuccess(err, res, 'createUser');
    console.log('Received and processed JSON data. Logging in..');
    //automatically log new user in
    authentication.handleLogin(req, res, passport);
  });
};

exports.createPost = function(req, res){
  //varify user is logged in
  if (req.isAuthenticated()){
    var uploadedImages = [];
    var thumbnail = null;

    //check if there are files to be uploaded
    if (req.files){
      //save all uploaded images, replacing private directory with public path
      (req.files).forEach(function(image) {
        uploadedImages.push(image.path.replace('static/', '/assets/'));
      }, this);

      //save the first image as the thumbnail
      thumbnail = uploadedImages[0];
    }

    var newPost = {
      ownerID: req.user._id,
      title: req.body.title,
      address: req.body.address,
      type: req.body.type,
      description: req.body.description,
      thumbnail: thumbnail,
      images: uploadedImages
    };

    //create new database entry from POST request's JSON object
    Post.create(newPost, function(err, results){
      varifyQuerySuccess(err, res, 'createPost');
      res.send('Received and processed JSON data.');
    });
  }
  else {
    res.status(400).send({message: 'Please Log In.'});
  }
};

exports.send = function(req, res, next){
    console.log('received send request!');
    console.log('req.params.ownerId: '+ req.body.ownerId);

    User.findOne({'_id': req.body.ownerId}, 'email nickname phone date', function(err, user){
      varifyQuerySuccess(err, res, 'send');
      console.log('user.email: '+ user.email);
      // res.send(user);
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'jtran6520@gmail.com',
          pass: 'Netgain6'
        }
      });
      var mailOptions = {
        from: 'Sender <zlatko.gantchev@gmail.com>',
        to: user.email,
        subject: 'this is subject',
        text: 'this is body message'
      }
      transporter.sendMail(mailOptions, function(err, info){
        if(err){
          console.log(err);
          res.redirect('/');
        } else {
          console.log('message sent!');
          res.redirect('/');
        }
      });

      });
}

//-------------------------- PUT requests --------------------------//
exports.updateUserInfo = function(req, res){
  //varify user is logged in
  if (req.isAuthenticated()){
    //TODO: varify password a second time, for additional security before account changes

    //define mongoose function settings
    var query = {_id: req.user._id};
    var settings = {new: true};

    //create newObject, made up of changes to account info, disregarding empty fields
    var newObject = {};
    for (let field in req.body){
        if (req.body[field] != "")
          newObject[field] = req.body[field];
    }

    User.findByIdAndUpdate(query, newObject, settings, function(err, user) {
      varifyQuerySuccess(err, res, 'updateUserInfo');
      res.send('Got a put request at /user');
    });
  }
  else {
    res.status(400).send({message: 'Please Log In.'});
  }
};

exports.updatePostInfo = function (req, res) {
  //varify user is logged in
  if (req.isAuthenticated()){
    varifyRightfulOwner(req, function(isRightfulOwner){
      if (isRightfulOwner){
        //define mongoose function settings
        var query = {_id: req.params.id};
        var newObject = {$set: req.body};
        var settings = {new: true};
        console.log(req.body);

        Post.findByIdAndUpdate(query, newObject, settings, function(err, post) {
          varifyQuerySuccess(err, res, 'updateUserInfo');
          res.send('Got a PUT request at /post');
        });
      }
      else {
        res.status(400).send({message: 'You are not the owner of this post.'});
      }
    });
  }
  else{
    res.status(400).send({message: 'Please Log In.'});
  }
};

//-------------------------- DELETE requests --------------------------//
exports.deleteUser = function (req, res) {
  User.findOneAndRemove({'_id': req.params.id}, function(err, result){
    varifyQuerySuccess(err, res, 'deleteUser');
    res.send('Got a DELETE request at /user');
  });
};

exports.deletePost = function (req, res) {
  //varify user is logged in
  if (req.isAuthenticated()){
    varifyRightfulOwner(req, function(isRightfulOwner){
      if (isRightfulOwner){
        //find and delete any images attachments
        Post.findOne({'_id': req.params.id}, 'images', function(err, post){
          if (post.images !== []){
            (post.images).forEach(function(imageURL){
              //replace public path with private directory
              var localImageURL = imageURL.replace('/assets/', 'static/');
              fs.unlinkSync(localImageURL);
            });
          }
        });

        //delete post
        Post.findOneAndRemove({'_id': req.params.id}, function(err, result){
          varifyQuerySuccess(err, res, 'deletePost');
          res.send('Got a DELETE request at /post');
        });
      }
      else {
        res.status(400).send({message: 'You are not the owner of this post.'});
      }
    });
  }
  else {
    res.status(400).send({message: 'Please Log In.'});
  }
};