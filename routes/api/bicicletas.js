var express = require('express');
var router = express.Router();
var controller = require('../../controllers/api/BicicletaControllerAPI');

router.get('/', controller.bicicleta_list);
router.post('/create', controller.bicicleta_create);
router.put('/update/:id', controller.bicicleta_update);
router.delete('/delete/:id', controller.bicicleta_delete);

module.exports = router;
