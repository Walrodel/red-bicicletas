var mongoose = require('mongoose');
var moment = require('moment'); 

var ReservaSchema = new mongoose.Schema({
    desde: {
        type: Date,
        required: true,
    },
    hasta: {
        type: Date,
        required: true,
    },
    bicicleta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bicicleta',
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
},
    {
        timestamps: true,
        versionKey: false
    });

ReservaSchema.methods.diasReserva = function () {
    return moment(this.hasta).diff(moment(this.desde), 'days') + 1;
}

var reserva = mongoose.model('Reserva', ReservaSchema);
module.exports = reserva;