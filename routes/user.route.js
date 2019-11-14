var express = require('express');
var multer  = require('multer');

var userController = require('../controller/user.controller')
var validate = require('../validate/user.validate')
var authMidleware = require('../midlewares/auth.midleware.js')

var upload = multer({ dest: './public/uploads/' })
var router = express.Router()


router.get('/',userController.index);
router.get('/search',userController.search);
router.get('/create',userController.create);
router.get('/:id',userController.get);
router.post('/create',
	upload.single('avatar'),
	validate.postCreate,
	userController.postCreate
	);
module.exports = router;

