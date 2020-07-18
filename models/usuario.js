var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
var bcrypt = require('bcrypt');

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
    }
},
    {
        timestamps: true,
        versionKey: false
    });

UsuarioSchema.pre('save', (next) => {
    if(this.isModifield('password')){
        this.password = bcrypt.hashSync(this.password, salfRounds);
    }
    next();
});

UsuarioSchema.plugin(uniqueValidator,{message: 'Ya existe un usuario con el Email.'});

UsuarioSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

UsuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    reserva.save(cb);
}

var usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = usuario;