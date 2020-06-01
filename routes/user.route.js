var express = require('express');
var userController = require('../controller/user.controller')
var router = express.Router()


router.get('/',userController.index);
router.get('/search',userController.search);
router.get('/:id',userController.get);
router.get('/:id/delete',userController.deleteUser)
module.exports = router;

