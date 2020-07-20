var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('./config/passport');
var session = require('express-session');

//Models
require('./models/bicicleta');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var biciletasRouter = require('./routes/bicicletas');
var biciletasApiRouter = require('./routes/api/bicicletas');
var usuariosApiRouter = require('./routes/api/usuarios');
var tokenRouter = require('./routes/token');

//Configs
require('./config/connection');

var store = new session.MemoryStore;

var app = express();

app.use(session({
  cookie: {maxAge: 240 * 60 * 60 *1000},
  store: store,
  saveUninitialized: true,
  resave: true,
  secret: 'red_biciletas'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res, next) {
  res.render('session/login');
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, usuario, info){
    if(err) return next(err);
    if(!usuario) return res.render('session/login', info);
    req.login(usuario, function(err){
      if(err) return next(err);
      console.log('req.user:', req.user);
      res.redirect('/bicicletas');
    })
  })(req, res, next);
});

app.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

app.get('/forgotpasswor', function(req, res, next) {
  res.render('session/forgotPasswor');
});

app.post('/forgotpasswor', function(req, res, next) {
  
});

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/bicicletas', logenIn, biciletasRouter);
app.use('/api/bicicletas', biciletasApiRouter);
app.use('/api/usuarios', usuariosApiRouter);
app.use('/token', tokenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

function logenIn(req, res, next){
  console.log(req.user);
  if(req.user){
    next();
  }else{
    console.log('Usuario sin logearse.');
    res.redirect('/login');
  }
}

module.exports = app;
