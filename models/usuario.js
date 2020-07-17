var mongoose = require('mongoose');
var Reserva = require('./reserva');

var UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
        versionKey: false
    });

UsuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    reserva.save(cb);
}

var usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = usuario;