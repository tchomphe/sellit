var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var crypto = require('crypto');

//define User Schema
var userSchema = new Schema({
  email:  {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  nickname: { type: String, trim: true},
  phone: Number
});

userSchema.methods.validPassword = function(pw){
  return (this.password === pw);
}

//create & export User Model
module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback){
  newUser.password = crypto.createHmac('sha256', newUser.password)
    .update('salty')
    .digest('hex');
  newUser.save();
}