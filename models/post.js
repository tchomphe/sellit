var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//define Post Schema
var postSchema = new Schema({
  title:  String,
  address: String,
  date: { type: Date, default: Date.now },
  type: String,
  description: String,
  username: {type: ObjectId, ref: 'user'}
});

//create & export Post Model
module.exports = mongoose.model('Post', postSchema);