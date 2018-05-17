var User = require('../config/models/user');
var Post = require('../config/models/post');
var vagetaID = "595ac2f805957207512c4b64";

var seedUsers = module.exports.users = {
  vageta: {
    _id: vagetaID,
    email: 'vageta@gmail.com',
    password: 'Over 9000!',
    nickname: 'Sayan Prince'
  }
}

var seedPosts = module.exports.posts = [
  {
    ownerID: vagetaID,
    title: 'iCapsure Ultimate',
    type: 'smartphone',
    postalCode: 'M5B 2R8',
    city: 'Central City'
  },
  {
    ownerID: vagetaID,
    title: 'BananaPhone',
    type: 'smartphone',
    postalCode: 'M5B 2R8',
    city: 'Central City'
  }
];

module.exports.upload = function() {
  console.log('SEED UPLOADING...');

  // write seed users in mongoDB
  for (var i in seedUsers){
    // JS always passes objects by reference! So we're creating a clone to pass over to the DB
    // TODO: find a way to pass this by value so saveNewUser doesn't replace pw with hashed version
    var userClone = JSON.parse(JSON.stringify(seedUsers[i]));

    User.saveNewUser(userClone, function(err, user){
      if (err) { console.log(err); }
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
  for (var i in seedUsers){
    User.findOneAndRemove({'_id': seedUsers[i]._id}, function(err, result){
      if (err) { console.log('Error in User seed data cleanup! --> ' + err); }
      console.log('Cleaned: ' + seedUsers[i].nickname);
    });
  }

  // clean seed posts
  seedPosts.forEach(function(seedPost) {
    Post.findOneAndRemove({'ownerID': seedPost.ownerID}, function(err, result){
      if (err) { console.log('Error in Posts seed data cleanup! --> ' + err); }
      console.log('Cleaned: ' + seedPost.title);
    })
  });
}