var express = require('express');
var multer  = require('multer');
var Product = require('../models/product.model')

var productController = require('../controller/product.controller')
var validate = require('../validate/product.validate')
// var authMidleware = require('../midlewares/auth.midleware.js')

var upload = multer({ dest: './public/uploads/' })
var router = express.Router()


router.get('/',productController.index);
// router.get('/search',productController.search);
router.get('/create',productController.create);
router.post('/create',
	upload.single('pro_image'),
	validate.postCreate,
	productController.postCreate
	);
router.get('/:id',productController.get);
router.get('/:id/delete',productController.deleteProduct)
module.exports = router;

