var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = (req, res) => {
    Bicicleta.find({},(err, bicicletas)=>{
        res.status(200).json({
            bicicletas: bicicletas
        });
    });
} 

exports.bicicleta_create = (req, res) => {
    var bici = new Bicicleta({ code: req.body.code, color: req.body.color, modelo: req.body.modelo });
    //bici.ubicacion = [req.body.lat,req.body.lng];
    Bicicleta.add(bici, (err, resBici) => {
        if (err) console.log(err);
        res.status(200).json({
            bicicleta: resBici
        });
    });
}

exports.updateBicicletaById = (req, res, ) => {
    var id = req.params.id;
    var body = req.body;
    if (!id) {
        res.status(400).send('Id is missing');
        return;
    }
    var updateData = body || {}
    // console.log("Update>>>>",updateData)
    Bicicleta.findByIdAndUpdate({
        _id: id
    }, updateData, (err, resBici) => {
        if (resBici) {
            res.status(200).json({
                bicicleta: resBici
            });
        } else if (err) {
            res.status(400).send(err);
        }
    });
}

exports.bicicleta_delete = (req, res) => {
    var id = req.params.id;
    var query = {
        _id: id,
    };
    Bicicleta.deleteOne(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(202).send(response);
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: 'No data found'
                });
            }
        }
    });
}