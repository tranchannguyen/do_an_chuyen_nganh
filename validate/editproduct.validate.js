// var Product = require('../models/product.model');


module.exports.postEdit = function(req,res,next){

	// let products = await Product.find({email:req.body.email});

    var errors = [];
    
    if(req.body.name==""){
        errors.push('chua co ten san pham')
    }else if(req.body.name.length<=6){
		errors.push('Name is short')
	}
	if(req.body.price==""){
		errors.push('Price null')
	}
	if(req.body.description==""){
		errors.push('Thiếu mô tả')
	}
	if(req.body.quantity==""){
		errors.push('Vui lòng nhập số lượng')
	}
	if(errors.length){
		res.render('products/edit',{
			errors: errors,
			values: req.body
		});

		return;
	}
	next();
}