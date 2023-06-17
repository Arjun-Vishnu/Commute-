var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models/db')
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');


db.on('error', function(err){
  console.log(err);
});

db.once('open', function(){
  console.log("Connected to mongodb");
});


var fileRouter = require('./routes/fileProcessor');
var loginRouter = require('./routes/login');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(cors({
  origin: 'http://localhost:3001',
}));

app.use('/', fileRouter);
app.use('/users', loginRouter);
app.use('/auth', authRouter);
app.use('/schema', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('hello');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
