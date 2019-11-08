var express = require('express');
var multer  = require('multer');

var adminController = require('../controller/admin.controller')
var router = express.Router()

router.get('/',adminController.index);
module.exports = router;
