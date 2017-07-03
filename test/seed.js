var User = require('../config/models/user');
var Post = require('../config/models/post');
var vagetaID = "595ac2f805957207512c4b64";

var seedUsers = [
  {
    _id: vagetaID,
    email: 'vageta@gmail.com',
    password: 'Over 9000!',
    username: 'Sayan Prince'
  }
];
var seedPosts = [
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

    User.insertMany(seedUsers, function(err, docs){
        if (err) { console.log(err); }
    });
    Post.insertMany(seedPosts, function(err, docs){
        if (err) { console.log(err); }
    });

    console.log('Finished uploading seed data.');
}

module.exports.clean = function() {
  console.log('SEED CLEANING...');

  seedUsers.forEach(function(seedUser) {
    User.findOneAndRemove({'_id': seedUser._id}, function(err, result){
      if (err) { console.log('Error in User seed data cleanup! --> ' + err); }
      console.log('Cleaned: ' + seedUser.username);
    })
  });

  seedPosts.forEach(function(seedPost) {
    User.findOneAndRemove({'ownerID': seedPost.ownerID}, function(err, result){
      if (err) { console.log('Error in Posts seed data cleanup! --> ' + err); }
      console.log('Cleaned: ' + seedPost.title);
    })
  });
}