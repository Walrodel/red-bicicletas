var express = require('express');
var router = express.Router();
const passport = require('../../config/passport');
var controller = require('../../controllers/api/authContollerAPI');

router.post('/authenticate', controller.authenticate);
router.post('/facebook_token', passport.authenticate('facebook-token'), controller.authFacebooToken);

module.exports = router;
