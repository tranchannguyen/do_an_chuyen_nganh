var express = require('express');
var multer  = require('multer');

var productController = require('../controller/product.controller')
var validate = require('../validate/product.validate')

var upload = multer({ dest: './public/uploads' })
var router = express.Router()


router.get('/',productController.index);
// router.get('/search',productController.search);
router.get('/create',productController.create);
router.post('/create',
upload.array('pro_images',3),
	validate.postCreate,
	productController.postCreate
	);
router.get('/:id',productController.get);
router.get('/edits/:id',productController.edit);
router.get('/:id/delete',productController.deleteProduct)
router.post('/edits/:id',productController.postEdit)
module.exports = router;

