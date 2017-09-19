var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var mongoosePaginate = require('mongoose-paginate');

//define Post Schema
var postSchema = new Schema({
  // email:  { type: String, required: true, trim: true },
  ownerID: {type: ObjectId, ref: 'user', required: true},
  date: {type: Date, default: Date.now},
  title:  {type: String, required: true, trim: true},
  type: {type: String, required: true, trim: true},
  address: {type: String, required: true, trim: true},
  price: {type: Number},
  description: {type: String, trim: true},
  thumbnail: {type: String, trim: true},
  images:[],
});

//create text indexes for text search queries
postSchema.index({title: 'text'});

//plug in pagination
postSchema.plugin(mongoosePaginate);

//create & export Post Model
module.exports = mongoose.model('Post', postSchema);