const express = require('express');
const router = express.Router();
const Book = require('../models/book')
const Comment = require('../models/comment')

// Books routes
router.get('/', (req, res) => {
  // Fetch books from database
  Book.find({}, (err, books) => {
    if(err) return next(err)
    res.render('books', {books: books});
  })
});

router.get('/new', (req, res) => {
  res.render('addBook')
})

router.post('/', (req, res, next) => {
  // Capture data
  // Save to db
  Book.create(req.body, (err, createdBook) => {
    // Respond back to client
    if(err) return next(err)
    res.redirect('books')
  })
})

// router.get('/:id', (req, res, next) => {
//   let id = req.params.id
//   Book.findById(id, (err, book) => {
//     if(err) return next(err)
//     Comment.find({bookId: id}, (err, comments) => {
//       if(err) return next(err)
//       res.render('bookDetails', {book, comments})
//     })
//   })
// })

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Book.findById(id).populate('comments').exec((err, book) => {
    if(err) return next(err)
    res.render('bookDetails', {book})
  })
})

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id
  Book.findById(id, (err, book) => {
    if(err) next(err)
    res.render('editBookForm', {book: book})
  })
})

router.post('/:id', (req, res) => {
  let id = req.params.id
  Book.findByIdAndUpdate(id, req.body, (err, updatedBook) => {
    if(err) return next(err)
    res.redirect('/books/' + id)
  })
})

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id
  Book.findByIdAndDelete(id, (err, book) => {
    if(err) return next(err)
    Comment.deleteMany({ bookId: book.id}, (err, info) => {
      res.redirect('/books')
    })
  })  
}) 

router.post('/:id/comments', (req, res, next) => {
  let id = req.params.id
  req.body.bookId = id
  Comment.create(req.body, (err, comment) => {
    if(err) return next(err)
    Book.findByIdAndUpdate(id, { $push: {comments: comment._id}}, (err, updatedBook) => {
      if(err) return next(err)
      res.redirect('/books/' + id)
    })
  })
})
 
module.exports = router;