const mongoose = require('mongoose')
const Schema = mongoose.Schema

let commentSchema = new Schema({
  name: {type: String, required: true, default: 'Anonymous'},
  content: {type: String, required: true},
  bookId: {type: Schema.Types.ObjectId, ref: 'Book', required: true}
})

let Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment