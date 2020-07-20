var Usuario = require('../models/usuario');

exports.usuarios_list = (req, res) => {
    Usuario.find({},(err, usuarios)=>{
        res.render('usuarios/index', {usuarios: usuarios});
    });
} 

exports.usuario_create_get = (req, res) => {
    res.render('usuarios/create', {errors: {}, usuario: new Usuario()});
} 

exports.usuario_create_post = (req, res) => {
    if(req.body.password !== req.body.confirmar_password){
        res.render('usuarios/create', {errors: {confirmar_password: {message: 'No coincide el password'}}, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email, password: req.body.password})});
        return;
    }
    let usuario = new Usuario({nombre: req.body.nombre, email: req.body.email, password: req.body.password});
    usuario.save((err) => {
        if(err){
            console.log(err);
            res.render('usuarios/create', {errors: err.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email, password: req.body.password})});
            return;
        }
        usuario.enviar_email_bienvenida();
        res.redirect('/usuarios');
    })
} 

exports.usuario_update_get = (req, res) => {
    Usuario.findById(req.params.id,function(error, usuario){
        res.render('usuarios/update',{errors:{}, usuario: usuario});
    })
} 

exports.usuario_update_post = (req, res) => {
    let update_values = {nombre: req.body.nombre};
    Usuario.findByIdAndUpdate(req.params.id, update_values, function(err, usuario){
        if(err){
            console.log(err);
            res.render('usuarios/update',{errors:err.errors, usuario: new Usuario({nombre: req.body.nombre})});
        }else {
            res.redirect('/usuarios');
        }
    })
} 

exports.usuario_delete_post = (req, res) => {
    var id = req.params.id;
    var query = {
        _id: id,
    };
    Usuario.deleteOne(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.redirect('/usuarios');
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: 'No data found'
                });
            }
        }
    });
} 