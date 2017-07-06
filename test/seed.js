var User = require('../config/models/user');
var Post = require('../config/models/post');
var vagetaID = "595ac2f805957207512c4b64";

var seedUsers = module.exports.users = {
  vageta: {
    _id: vagetaID,
    email: 'vageta@gmail.com',
    password: 'Over 9000!',
    username: 'Sayan Prince'
  }
}

var seedPosts = module.exports.posts = [
  {
    ownerID: vagetaID,
    title: 'iCapsure Ultimate',
    type: 'smartphone',
    address: '24 Vogo Corp. St'
  },
  {
    ownerID: vagetaID,
    title: 'BananaPhone',
    type: 'smartphone',
    address: '24 Vogo Corp. St',
  }
];

module.exports.upload = function() {
    console.log('SEED UPLOADING...');

    // write seed users in mongoDB
    for (var currentUser in seedUsers){
      User.saveNewUser(seedUsers[currentUser], function(err, user){
        if (err) { console.log(err); };
      });
    }

    // write seed posts in mongoDB
    Post.insertMany(seedPosts, function(err, docs){
        if (err) { console.log(err); }
    });

    console.log('Finished uploading seed data.');
}

module.exports.clean = function() {
  console.log('SEED CLEANING...');

  // clean seed users
  for (var currentUser in seedUsers){
    User.findOneAndRemove({'_id': seedUsers[currentUser]._id}, function(err, result){
      if (err) { console.log('Error in User seed data cleanup! --> ' + err); }
      console.log('Cleaned: ' + seedUsers[currentUser].username);
    });
  }

  // clean seed posts
  seedPosts.forEach(function(seedPost) {
    User.findOneAndRemove({'ownerID': seedPost.ownerID}, function(err, result){
      if (err) { console.log('Error in Posts seed data cleanup! --> ' + err); }
      console.log('Cleaned: ' + seedPost.title);
    })
  });
}