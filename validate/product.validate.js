// var Product = require('../models/product.model');


module.exports.postCreate = function(req,res,next){

	// let products = await Product.find({email:req.body.email});

	var errors = [];
	if(req.body.name.length<=6){
		errors.push('Name is short')
	}
	if(req.body.price==""){
		errors.push('Price null')
	}
	if(req.body.decription==""){
		errors.push('Thiếu mô tả')
	}
	if(req.body.quantity==""){
		errors.push('Vui lòng nhập số lượng')
	}
	if(req.body.pro_images==""){
		errors.push('Ảnh sản phẩm trống')
	}
	if(errors.length){
		res.render('products/create',{
			errors: errors,
			values: req.body
		});

		return;
	}
	next();
}