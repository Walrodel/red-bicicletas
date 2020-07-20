var express = require('express');
var router = express.Router();
var controller = require('../controllers/token');

router.get('/confirmacion/:token', controller.confimarToken);

module.exports = router;