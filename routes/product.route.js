var express = require('express');
var multer  = require('multer');


var productController = require('../controller/product.controller')
// var validate = require('../validate/user.validate')
// var authMidleware = require('../midlewares/auth.midleware.js')

var upload = multer({ dest: './public/uploads/' })
var router = express.Router()


router.get('/',productController.index);
// router.get('/search',productController.search);
router.get('/create',productController.create);
// router.get('/:id',productController.get);
// router.post('/create',
// 	upload.single('avatar'),
// 	// validate.postCreate,
// 	productController.postCreate
// 	);
module.exports = router;

