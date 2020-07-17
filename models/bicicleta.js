var mongoose = require('mongoose');

var BicicletaSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    color: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: [Number],
        required: false,
        index: {
            type: '2dsphere',
            sparse: true
        }
    },
},
    {
        timestamps: true,
        versionKey: false
    });

BicicletaSchema.methods.toString = () => {
    return `code: ${this.code} color: ${this.color}`;
}

BicicletaSchema.statics.createIntance = function (code, color, modelo, ubicacion) {
    return new this(
        {
            code: code,
            color: color,
            modelo: modelo,
            ubicacion: ubicacion
        }
    );
}

BicicletaSchema.statics.allBicis = function (callback) {
    return this.find({}, callback);
}

BicicletaSchema.statics.add = function (bici, callback) {
    return this.create(bici, callback);
}

BicicletaSchema.statics.findByCode = function (aCode, callback) {
    return this.findOne({code: aCode}, callback);
}

BicicletaSchema.statics.removeByCode = function (aCode, callback) {
    return this.deleteOne({code: aCode}, callback);
}

var bicicleta = mongoose.model('Bicicleta', BicicletaSchema);
module.exports = bicicleta;