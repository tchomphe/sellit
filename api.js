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

exports.getUsernameByID = function(req, res){
  User.findOne({'_id': req.params.id}, 'username', function(err, user){
    if (err) console.log(err);
    console.log(user.username);
  });
};

//-------------------------- POST request --------------------------//
exports.createPost = function(req, res){
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
};

//-------------------------- PUT requests --------------------------//
exports.updateUserInfo = function(err, res){
  res.send('Got a put request at /user');
  User.findByIdAndUpdate({_id: req.params.id}, {$set: {phone: req.body.phone}}, {new: true}, function(err, User) {
    if(err) return handleError(err);
    Console.log('Update user phone number successful');
  });
};

exports.updatePostInfo = function (req, res) {
  res.send('Got a PUT request at /post');
  var updatedPost = {};
  
  if(req.body.title){
      updatedPost.title = req.body.title;
  };
  if(req.body.address){
      updatedPost.address = req.body.address;
  }
  if(req.body.title){
      updatedPost.date = req.body.date;
  }
  if(req.body.type){
      updatedPost.type = req.body.type;
  }
  if(req.body.description){
      updatedPost.description = req.body.description;
  }
  
  Post.findByIdAndUpdate({_id: req.params.id}, updatedPost, {new: true}, function(err, Post) {
  if (err) return handleError(err);
  console.log('Update post title successful!');
  });
};

//-------------------------- DELETE requests --------------------------//
exports.deleteUser = function (req, res) {
  res.send('Got a DELETE request at /user');
  User.findOneAndRemove({'_id': req.params.id}, function(err, result){
    if(err) return handleError(err);
    console.log('Delete user successful!');
  });
};

exports.deletePost = function (req, res) {
  res.send('Got a DELETE request at /post');
  Post.findOneAndRemove({'_id': req.params.id}, function(err, result){
    if(err) return handleError(err);
    console.log('Delete post successful!');
  });
};