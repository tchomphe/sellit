var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var crypto = require('crypto');

// Define User Schema
var userSchema = new Schema({
  email:  {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  nickname: { type: String, trim: true},
  phone: Number
});

userSchema.methods.validPassword = function(pw){
  return (this.password === pw);
}

// Create & export User Model
var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback){
  // Create hash for user's password
  newUser.password = crypto.createHmac('sha256', newUser.password)
    .update('saltyy:[')
    .digest('hex');

  // Save new user to database
  User.create(newUser, function(err, user){
    if (err) callback(err);
  });
}