var express = require('express');
var router = express.Router();
var controller = require('../controllers/bicicleta');

router.get('/', controller.bicicleta_list);
router.get('/create', controller.bicicleta_create_get);
router.post('/create', controller.bicicleta_create_post);
router.get('/:id/update', controller.bicicleta_update_get);
router.post('/:id/update', controller.bicicleta_update_post);
router.post('/:id/delete', controller.bicicleta_delete_post);

module.exports = router;
