var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bicicleta',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    },
},
    {
        timestamps: false,
        versionKey: false
    });

var token = mongoose.model('Token', TokenSchema);
module.exports = token;