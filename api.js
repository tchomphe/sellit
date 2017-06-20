var Post = require('./models/post');
var User = require('./models/user');
var fs = require('fs');

/**
 * Helper Function that varifies the success or failure of a MongoDB query
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

//-------------------------- GET request --------------------------//
exports.paginatePosts = function(req, res){
  var query = {};
  var options = {
    page: req.params.pageNum,
    limit: 10
  };

  Post.paginate(query, options, function(err, result){
    console.log('Pagination success.');
    res.send(result);
  });
};

exports.getPostByTitle = function(req, res){
  Post.findOne({'title': req.params.title}, 'title address description date', function(err, post) {
    varifyQuerySuccess(err, res, 'getPostByTitle');
    res.send(post);
  });
};

exports.getUserByID = function(req, res){
  User.findOne({'_id': req.params.id}, 'email nickname', function(err, user){
    varifyQuerySuccess(err, res, 'getUserByID');
    res.send(user);
  });
};

exports.getPostByID = function(req, res){
  Post.findOne({'_id': req.params.id}, 'title address description date', function(err, post){
    varifyQuerySuccess(err, res, 'getPostByID');
    res.send(post);
  });
};

exports.getUserByEmail = function(req, res){
  User.findOne({'email': req.params.email}, 'name email email phone', function(err, user) {
    varifyQuerySuccess(err, res, 'getUserByEmail');
    res.send(user);
  });
};

//-------------------------- POST request --------------------------//
exports.createUser = function(req, res){
  var newUser = {
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
    phone: req.body.phone,
  };

  //create new database entry from POST request's JSON object
  User.create(newUser, function(err, results){
    varifyQuerySuccess(err, res, 'createUser');
    res.send('Received and processed JSON data.');
  });
};

exports.createPost = function(req, res){
  var uploadedImages = [];
  (req.files).forEach(function(image) {
    uploadedImages.push(image.path);
  }, this);

  var newPost = {
    title: req.body.title,
    address: req.body.address,
    type: req.body.type,
    description: req.body.description,
    images: uploadedImages
  };

  //create new database entry from POST request's JSON object
  Post.create(newPost, function(err, results){
    varifyQuerySuccess(err, res, 'createPost');
    res.send('Received and processed JSON data.');
  });
};

//-------------------------- PUT requests --------------------------//
exports.updateUserInfo = function(req, res){
  //define mongoose function settings
  var query = {_id: req.params.id};
  var newObject = {$set:req.body};
  var settings = {new: true};

  User.findByIdAndUpdate(query, newObject, settings, function(err, user) {
    varifyQuerySuccess(err, res, 'updateUserInfo');
    res.send('Got a put request at /user');
  });
};

exports.updatePostInfo = function (req, res) {
  var query = {_id: req.params.id};
  var newObject = {$set: req.body};
  var settings = {new: true};

  Post.findByIdAndUpdate(query, newObject, settings, function(err, post) {
    varifyQuerySuccess(err, res, 'updateUserInfo');
    res.send('Got a PUT request at /post');
  });

};

//-------------------------- DELETE requests --------------------------//
exports.deleteUser = function (req, res) {
  User.findOneAndRemove({'_id': req.params.id}, function(err, result){
    varifyQuerySuccess(err, res, 'deleteUser');
    res.send('Got a DELETE request at /user');
  });
};

exports.deletePost = function (req, res) {
  // find and delete any images attachments
  Post.findOne({'_id': req.params.id}, 'images', function(err, post){
    if (post.images !== []){
      (post.images).forEach(function(imageURL){
        fs.unlinkSync(imageURL);
      });
    }
  });

  // delete post
  Post.findOneAndRemove({'_id': req.params.id}, function(err, result){
    varifyQuerySuccess(err, res, 'deletePost');
    res.send('Got a DELETE request at /post');
  });
};