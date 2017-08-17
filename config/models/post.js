var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var mongoosePaginate = require('mongoose-paginate');

//define Post Schema
var postSchema = new Schema({
  ownerID: {type: ObjectId, ref: 'user', required: true},
  title:  {type: String, required: true, trim: true},
  address: {type: String, required: true, trim: true},
  type: {type: String, required: true, trim: true},
  date: { type: Date, default: Date.now },
  description: {type: String, trim: true},
  images:[],
});

//create text indexes for text search queries
postSchema.index({title: 'text'});

//plug in pagination
postSchema.plugin(mongoosePaginate);

//create & export Post Model
module.exports = mongoose.model('Post', postSchema);