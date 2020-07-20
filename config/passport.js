const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
    function (email, password, done) {
        Usuario.findOne({ email: email }, function (err, usuario) {
            if (err) return done(err);
            if (!usuario) return done(null, false, { message: 'Email no existe.' });
            if (!usuario.validatePassword(password)) return done(null, false, { message: 'Password no valido.' });
            done(null, usuario);
        })
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
})

passport.deserializeUser(function (user, cb) {
    Usuario.findById(user.id, function (err, usuario) {
        cb(err, usuario)
    })
})

module.exports = passport;