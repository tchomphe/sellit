var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var mongoosePaginate = require('mongoose-paginate');

//define Post Schema
var postSchema = new Schema({
  title:  String,
  address: String,
  date: { type: Date, default: Date.now },
  type: String,
  description: String,
  username: {type: ObjectId, ref: 'user'}
});

//plug in pagination
postSchema.plugin(mongoosePaginate);

//create & export Post Model
module.exports = mongoose.model('Post', postSchema);