var express = require('express');
var router = express.Router();
var Order = require('../models/order')
var orderController = require('../controller/order.controller')



router.get('/', async function(req,res){
    var orders =  await Order.find();
    res.render('products/listOrder',{ orders: orders})
});
router.get('/:id', orderController.get
);

module.exports = router;