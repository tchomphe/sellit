var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

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