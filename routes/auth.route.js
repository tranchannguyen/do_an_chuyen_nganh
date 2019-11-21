var express = require('express');
var authController = require('../controller/auth.controller.js')
var router = express.Router()

router.get('/login',authController.login);
router.post('/login',authController.postlogin);


module.exports = router;