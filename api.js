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
};

//-------------------------- PUT requests --------------------------//
exports.updateUserInfo = function(err, res){
  res.send('Got a put request at /user');
  User.findByIdAndUpdate({_id: req.params.id}, {$set: {phone: req.body.phone}}, {new: true}, function(err, User) {
    if(err)
      return console.log('ERROR in updatePostInfo:', err);
    else
      Console.log('Update user phone number successful');
  });
};

exports.updatePostInfo = function (req, res) {
  res.send('Got a PUT request at /post');

  Post.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, post) {
    if (err)
      return console.log('ERROR in updatePostInfo:', err);
    else
      console.log('Update post title successful! New post: '+post);
  });
};

//-------------------------- DELETE requests --------------------------//
exports.deleteUser = function (req, res) {
  res.send('Got a DELETE request at /user');
  User.findOneAndRemove({'_id': req.params.id}, function(err, result){
    if(err)
      return console.log('ERROR in deleteUser:', err);
    else
      console.log('Deleted user successful!');
  });
};

exports.deletePost = function (req, res) {
  res.send('Got a DELETE request at /post');
  Post.findOneAndRemove({'_id': req.params.id}, function(err, result){
    if(err)
      return console.log('ERROR in deletePost:', err);
    else
      console.log('Deleted post successful!');
  });
};