var Usuario = require('../models/usuario');
var Token = require('../models/token');
const { token } = require('morgan');
const usuario = require('../models/usuario');

exports.confimarToken = (req, res) => {
    console.log(req.params.token);
    Token.findOne({token: req.params.token}, (err, token) => {
        if(!token){
            return res.status(400).send({type: 'no verificado', mgs: 'No existe token.'});
        }
        Usuario.findById(token.usuarioId, (err, usuario) => {
            if(!usuario){
                return res.status(400).send({mgs: 'Usuario no existe con este token.'});
            }
            if(usuario.verificado){
                return res.redirect('/usuarios');
            }
            usuario.verificado = true;
            usuario.save(function(err) {
                 if(err){
                    return res.status(500).send({msg: err.message});
                 }
                 res.redirect('/');
            })
        })
    })
}