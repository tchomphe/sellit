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
    console.log('Uploading seed data...');

    User.insertMany(seedUsers, function(err, docs){
        if (err) { console.log(err); }
    });
    Post.insertMany(seedPosts, function(err, docs){
        if (err) { console.log(err); }
    });

    console.log('Finished uploading seed data.');
}
