var express = require('express');
var router = express.Router();
var controller = require('../controllers/usuario');

router.get('/', controller.usuarios_list);
router.get('/create', controller.usuario_create_get);
router.post('/create', controller.usuario_create_post);
router.get('/:id/update', controller.usuario_update_get);
router.post('/:id/update', controller.usuario_update_post);
router.post('/:id/delete', controller.usuario_delete_post);

module.exports = router;

