var Usuario = require('../../models/usuario');

exports.usuario_list = (req, res) => {
    Usuario.find({},(err, usuarios)=>{
        res.status(200).json({
            usuarios: usuarios
        });
    });
} 

exports.usuario_create = (req, res) => {
    let usuario = new Usuario({nombre: req.body.nombre});
    usuario.save((err) => {
        res.status(200).json({
            usuario: usuario
        });
    })
} 

exports.usuario_reservar = (req, res) => {
    Usuario.findById(req.body.id, (err, usuario) => {
        usuario.reservar(usuario._id, req.body.desde, req.body.hasta, (err) => {
            res.status(200).send();
        })
    });
} 