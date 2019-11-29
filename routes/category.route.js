var express = require('express');
var router = express.Router();
var categoryController = require('../controller/category.controller')

router.get('/',categoryController.index);
router.get('/create',categoryController.create);
router.post('/create',categoryController.postCreate);
router.get('/edits/:id',categoryController.edits);
router.get('/:id/delete',categoryController.deleteCategory)
router.post('/edits/:id',categoryController.postEdits);
module.exports = router;