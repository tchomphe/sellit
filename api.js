
var Post = require('./models/post');

// GET request
exports.getPostByTitle = function(req, res){
    res.send('Got a GET request');
    Post.findOne({'title': 'Momo'}, 'title address description date', function(err, post) {
      console.log(post.description + " was created on: " + post.date);
    });
};


