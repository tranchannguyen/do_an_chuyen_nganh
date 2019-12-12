var express = require('express');
var webpageController = require('../controller/webpage.controller')

var router = express.Router()


router.get('/',webpageController.index);
router.get('/viewAll',webpageController.viewAll);
router.get('/productofcategorys/:id',webpageController.viewProductByCateId);
router.get('/viewDetailProduct/:id',webpageController.viewProductById);
router.get('/resiger',webpageController.resiger)
router.post('/resiger',webpageController.postResiger)
router.get('/login',webpageController.login)
router.post('/login',webpageController.postLogin)
router.get('/logout',webpageController.logout)
// router.get('/search',userController.search);
// router.get('/create',userController.create);
// router.get('/:id',userController.get);
// router.get('/edits/:id',userController.edit);
// router.post('/create',
// 	upload.single('avatar'),
// 	validate.postCreate,
// 	userController.postCreate
// 	);
// router.post('/edits/:id',userController.putEdit)
// router.get('/:id/delete',userController.deleteUser)
module.exports = router;

