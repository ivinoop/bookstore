const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const commentsRouter = require('./routes/comments')

mongoose.connect('mongodb://localhost/bookstore', (err) => {
  console.log(err ? err : 'Connected to database');
})

let app = express();

// Built-in middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Setup views engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Handle static files
app.use(express.static(path.join(__dirname, 'public')));

// Routing middlewares
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/comments', commentsRouter)

// Error handler middlewares

// 404
app.use((req, res, next) => {
  res.send('Page not found')
});

// Custom
app.use((err, req, res, next)=> {
 res.send(err);
});

// Listener
app.listen(4000, () => {
  console.log('=> Server listening to port 4000');
})