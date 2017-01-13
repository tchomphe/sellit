var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//define User Schema
var userSchema = new Schema({
  name: {
      first: { type: String, required: true, trim: true},
      last: { type: String, required: true, trim: true}
  },
  phone: Number, 
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email:  {type: String, required: true, unique: true},
  //posts:[{type: ObjectId, ref: 'post'}]
});

//create & export User Model
module.exports = mongoose.model('User', userSchema);