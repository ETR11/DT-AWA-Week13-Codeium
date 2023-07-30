var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose.connect('mongodb://127.0.0.1:27017/codeium', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

var app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("*", (req, res) =>
      res.sendFile(path.resolve("..", "client", "build", "index.html"))
    );
  } else if (process.env.NODE_ENV === 'development') {
    var corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
      };
      app.use(cors(corsOptions));
  }

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
