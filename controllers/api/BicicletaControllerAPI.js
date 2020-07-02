var Bicicleta = require('../../models/Bicicleta');

exports.bicicleta_list = (req, res) => {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
} 

exports.bicicleta_create = (req, res) => {
    let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo)
    bici.ubicacion = [req.body.lat,req.body.lng];
    Bicicleta.add(bici);
    res.status(200).json({
        bicicleta: bici
    });
} 

exports.bicicleta_update = (req, res) => {
    let bici = Bicicleta.findById(req.params.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat,req.body.lng];
    res.status(200).json({
        bicicleta: bici
    });
} 

exports.bicicleta_delete = (req, res) => {
    console.log(req.params.id);
    Bicicleta.removeById(req.params.id);
    res.status(204).send();
} 