var express = require('express');
var authController = require('../controller/auth.controller.js')
var router = express.Router()

router.get('/',authController.login);
router.post('/',authController.postlogin);
router.get('/logout',authController.logout);

module.exports = router;