const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        Usuario.findOrCreateGoogle(profile, function (err, user) {
            return done(err, user);
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