const Usuario = require('../../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: function(req, res, next) {
        Usuario.findOne({email: req.body.email}, function(err, usuarioInfo) {
            if(err){
                next(err);
            } else {
                if(usuarioInfo === null){
                    return res.status(404).json({
                        status: 'error',
                        message: 'email/password invalido.',
                        data: null
                      });
                }
                if(usuarioInfo !== null && bcrypt.compareSync(req.body.password, usuarioInfo.password)) {
                    let token = jwt.sign({id: usuarioInfo._id}, req.app.get('secretKey'),{expiresIn: '7d'});
                    res.status(200).json({
                        message: 'usuario encontrado.',
                        data: {
                            usuario: usuarioInfo,
                            token: token
                        }
                      });
                } else {
                    res.status(404).json({
                        status: 'error',
                        message: 'email/password invalido.',
                        data: null
                      });
                }
            }
        })
    },
    forgotPassword: function(req, res, next){
        Usuario.findOne({email: req.body.email}, function(err, usuario){
            if(!usuario) return res.status(400).json({message: 'No existe el email.', data: null});
            usuario.resetPassword(function(err){
              if(err) return next(err);
              res.status(200).json({message: 'se a enviado email para restablecer password', data: null});
            })
          })
    }
}