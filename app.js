var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('./config/passport');
var session = require('express-session');
var jwt = require('jsonwebtoken');

//Models
require('./models/bicicleta');
const Usuario = require('./models/usuario');
const Token = require('./models/token');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var biciletasRouter = require('./routes/bicicletas');
var biciletasApiRouter = require('./routes/api/bicicletas');
var usuariosApiRouter = require('./routes/api/usuarios');
var tokenRouter = require('./routes/token');
var authRouter = require('./routes/api/auth');
const { send } = require('process');

//Configs
require('./config/connection');

var store = new session.MemoryStore;

var app = express();
app.set('secretKey', 'jwt_12345')

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
      res.redirect('/');
    })
  })(req, res, next);
});

app.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

app.get('/forgotpassword', function(req, res, next) {
  res.render('session/forgotPassword');
});

app.post('/forgotpassword', function(req, res, next) {
  Usuario.findOne({email: req.body.email}, function(err, usuario){
    if(!usuario) return res.render('session/forgotPassword', {info:{message: 'No existe el email.'}});
    usuario.resetPassword(function(err){
      if(err) return next(err);
    })
    res.render('session/forgotPasswordMessage');
  })
});

app.get('/resetPassword/:token', function(req, res, next) {
  Token.findOne({token: req.params.token}, function(err, token) {
    if(!token) return res.status(400),send({type:'not-verified', msg: 'No existe usuario asociado al token.'});
    Usuario.findById(token.usuarioId, function(err, usuario) {
      if(!usuario) return res.status(400),send({type:'not-verified', msg: 'No existe usuario asociado al token.'});
      res.render('session/resetPassword', {errors: {}, usuario: usuario});
    })
  })
});

app.post('/resetPassword', function(req, res, next) {
  if(req.body.password !== req.body.confirm_password) {
    res.render('session/resetPassword', {errors: {confirm_password:{message: 'No coincide confirmar password.'}}, usuario: new Usuario({email: req.body.email})});
    return;
  }

  Usuario.findOne({email: req.body.email}, function(err, usuario) {
    if(!usuario) return res.status(400),send({type:'not-verified', msg: 'No existe usuario asociado al token.'});
    usuario.password = req.body.password;
    usuario.save(function (err) {
      if(err){
        res.render('session/resetPassword', {errors: err.errors, usuario: new Usuario({email: req.body.email})});
        return;
      }
      res.redirect('/login')
    })
  })
});

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/bicicletas', logenIn, biciletasRouter);
app.use('/api/auth', authRouter);
app.use('/api/bicicletas', validarUsuario, biciletasApiRouter);
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

function validarUsuario(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decode){
    if(err) {
      res.json({
        status: 'error',
        message: err.message,
        data: null
      });
    } else {
      req.body.userId = decode.id;
      console.log('verify: ', decode);
      next();
    }
  })
}

module.exports = app;
