var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
var Token = require('./token');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var mailer = require('../mailer/mailer');

const salfRounds = 10;

const validateEmail = function (emailToValidate) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(emailToValidate);
}

var UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es requerido.'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Email no valido.'],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/]
    },
    password: {
        type: String,
        required: [true, 'El password es requerido.'],
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    },
    googleId: String,
    facebookId: String
},
    {
        timestamps: true,
        versionKey: false
    });

UsuarioSchema.pre('save', function(next) {
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, salfRounds);
    }
    next();
});

UsuarioSchema.plugin(uniqueValidator,{message: 'Ya existe un usuario con el Email.'});

UsuarioSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

UsuarioSchema.methods.enviar_email_bienvenida = function (cb) {
    let token = new Token({usuarioId: this._id, token: crypto.randomBytes(16).toString('hex')});
    const emailDistination = this.email;
    token.save(function(err){
        if(err){
            console.log(err);
        }else{
            const mailOptions = {
                from: 'no-reply@redbicicletas.com',
                to: emailDistination,
                subject: 'Verificaion Cuenta',
                text: `Por favor verifique su cuenta http://localhost:3000/token/confirmacion/${token.token}`
            }
            mailer.sendMail(mailOptions, function(err){
                if(err){
                    console.log(err.message);
                    return;
                }
                console.log(`Se envio email a ${mailOptions.to}`);
            })
        }
    })
}

UsuarioSchema.methods.resetPassword = function (cb) {
    let token = new Token({usuarioId: this._id, token: crypto.randomBytes(16).toString('hex')});
    const emailDistination = this.email;
    token.save(function(err){
        if(err){
            console.log(err);
        }else{
            const mailOptions = {
                from: 'no-reply@redbicicletas.com',
                to: emailDistination,
                subject: 'Reseteo password de cuenta',
                text: `Por favor para resetear su password\nhttp://localhost:3000\/resetPassword\/${token.token}`
            }
            mailer.sendMail(mailOptions, function(err){
                if(err){
                    console.log(err.message);
                    return;
                }
                console.log(`Se envio email a ${mailOptions.to}`);
            })
        }
    })
}

UsuarioSchema.statics.findOrCreateGoogle = function findOneOrCreate(condition, callback){
    const self = this;
    self.findOne({
        $or: [
            {'googleId': condition.id}, {'email': condition.emails[0].value}
        ]
    },
    (err, result) => {
        if(result){
            callback(err, result);
        } else {
            let values = {};
            values.googleId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || "Sin nombre";
            values.verificado = true;
            values.password = condition._json.etag;
            self.create(values, (err, result) => {
                if(err) {console.log(err);}
                return callback(err, result);
            })
        }
    });
}

UsuarioSchema.statics.findOrCreateFacebook = function findOneOrCreate(condition, callback){
    const self = this;
    self.findOne({
        $or: [
            {'facebookId': condition.id}, {'email': condition.emails[0].value}
        ]
    },
    (err, result) => {
        if(result){
            callback(err, result);
        } else {
            console.log(condition);
            let values = {};
            values.facebookId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || "Sin nombre";
            values.verificado = true;
            values.password = crypto.randomBytes(16).toString('hex');
            self.create(values, (err, result) => {
                if(err) {console.log(err);}
                return callback(err, result);
            })
        }
    });
}

UsuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    reserva.save(cb);
}

var usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = usuario;