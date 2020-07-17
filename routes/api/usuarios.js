var express = require('express');
var router = express.Router();
var controller = require('../../controllers/api/UsuarioControllerAPI');

router.get('/', controller.usuario_list);
router.post('/create', controller.usuario_create);
router.post('/reservar', controller.usuario_reservar);

module.exports = router;
