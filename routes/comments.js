const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id
  Comment.findById(id, (err, comment) => {
    console.log(err);
    if(err) return next(err)
    res.render('updateComment', { comment })
  }) 
})

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id 
  Comment.findByIdAndDelete(id, (err, comment) => {
    if(err) return next(err)
    res.redirect('/books/' + comment.bookId)
  })
})

router.post('/:id', (req, res, next) => {
  let id = req.params.id 
  Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
    if(err) return next(err)
    res.redirect('/books/' + updatedComment.bookId)
  })
})

module.exports = router