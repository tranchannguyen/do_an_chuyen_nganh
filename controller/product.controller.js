var Product = require('../models/product.model')
// var shortid = require('shortid');
module.exports.index = async function(req,res){
	var products = await Product.find();

	res.render('products/index',{ products: products
	 });	
}
module.exports.deleteProduct = async function(req,res){

	await Product.remove({_id: req.params.id},function(err){
	if(err) res.json(err);
	else	res.redirect('/products');
});
}
// module.exports.search = async function(req,res){
// 	var q = req.query.q;
// 	var matcheUser = await User.find();
// 	var users = matcheUser.filter(function(user){
// 		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
// 	});
//     res.render('users/index',{ users: users });
// }
module.exports.edit =async function(req,res){
	var id = req.params.id;
	var products = await Product.find({_id: id});
	res.render('products/edit',
		{ products: products });
}
module.exports.postEdit = async function(req,res){
	await Product.findByIdAndUpdate({_id:req.params.id},{
		name:req.body.name,
		price:req.body.price,
		quantity:req.body.quantity,
		decription:req.body.decription,
		status:req.body.status,
		update_time : new Date()
	},function(err){
		if(err)	res.json(err);
		else	res.redirect('/products/'+req.params.id);
	})
}
module.exports.create = function(req,res){
	res.render('products/create');
}
module.exports.get = async function(req,res){
	var id = req.params.id;
	var products = await Product.find({_id: id});
	res.render('products/detailProduct',
		{ products: products });
}
module.exports.postCreate = async function(req,res){
	
	req.body.pro_image = req.file.path.split('\\').slice(1).join('/');
	if(req.body.quantity > 0)
	{
		req.body.status = true;
	}else req.body.status = false;
	console.log(req.body);
	await Product.insertMany(req.body);
	res.redirect('/products');
}
