var express = require('express');
var router = express.Router();
var controller = require('../../controllers/api/authContollerAPI');

router.post('/authenticate', controller.authenticate);

module.exports = router;
