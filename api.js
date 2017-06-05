var Post = require('./models/post');
var User = require('./models/user');

//-------------------------- GET request --------------------------//
exports.getPostPage = function(req, res){
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
    console.log(post.description + " was created on: " + post.date);
    res.send(post);
  });
};

exports.getUserByID = function(req, res){
  User.findOne({'_id': req.params.id}, 'username name email phone', function(err, user){
    if (err) console.log(err);
    console.log(user.username);
    res.send(user);
  });
};

//-------------------------- POST request --------------------------//
exports.createPost = function(req, res){
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
      if (err)
        return console.log('ERROR in createPost:', err);
      else {
        console.log(post.title);
        console.log(post.address);
        console.log(post.date);
        console.log(post.description);
      }
    });
  });

  res.send('Received JSON data!');
};

//-------------------------- PUT requests --------------------------//
exports.updateUserInfo = function(req, res){
  //define mongoose function settings
  var query = {_id: req.params.id};
  var newObject = {$set:req.body};
  var settings = {new: true};

  User.findByIdAndUpdate(query, newObject, settings, function(err, user) {
    if(err){
      res.status(500);
      console.log('ERROR in updatePostInfo:', err);
    }
    else{
      res.status(200);
      console.log('Update user phone number successful');
    }

    res.send('Got a put request at /user');
  });
};

exports.updatePostInfo = function (req, res) {
  var query = {_id: req.params.id};
  var newObject = {$set: req.body};
  var settings = {new: true};

  Post.findByIdAndUpdate(query, newObject, settings, function(err, post) {
    if (err)
      return console.log('ERROR in updatePostInfo:', err);
    else
      console.log('Update post title successful! New post: '+post);
  });

  res.send('Got a PUT request at /post');
};

//-------------------------- DELETE requests --------------------------//
exports.deleteUser = function (req, res) {
  User.findOneAndRemove({'_id': req.params.id}, function(err, result){
    if(err)
      return console.log('ERROR in deleteUser:', err);
    else
      console.log('Deleted user successful!');
  });

  res.send('Got a DELETE request at /user');
};

exports.deletePost = function (req, res) {
  Post.findOneAndRemove({'_id': req.params.id}, function(err, result){
    if(err)
      return console.log('ERROR in deletePost:', err);
    else
      console.log('Deleted post successful!');
  });

  res.send('Got a DELETE request at /post');
};