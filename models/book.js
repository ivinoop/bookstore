const mongoose  =require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema ({
  title: {type: String, required: true},
  description: String,
  price: Number,
  author: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

let Book = mongoose.model('Book', bookSchema);
module.exports =  Book;
