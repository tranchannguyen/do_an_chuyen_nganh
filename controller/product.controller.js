var Product = require('../models/product.model');
var Category = require('../models/category.model');
// var shortid = require('shortid');
module.exports.index = async function(req,res){
	var products = await Product.find();

	res.render('products/index',{ products: products
	 });	
}
module.exports.deleteProduct = async function(req,res){

	await Product.deleteMany({_id: req.params.id},function(err){
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
	var category = await Category.find();
	res.render('products/edit',
		{ products: products, category: category });
}
module.exports.postEdit = async function(req,res){
	if(req.body.quantity > 0)
	{
		req.body.status = true;
	}else req.body.status = false;
	await Product.findOneAndUpdate({_id:req.params.id},{
		name:req.body.name,
		price:req.body.price,
		quantity:req.body.quantity,
		idCate: req.body.idCate,
		decription:req.body.decription,
		status:req.body.status,
		update_time : new Date()
	},function(err){
		if(err)	res.json(err);
		else	res.redirect('/products/'+req.params.id);
	})
}
module.exports.create = async function(req,res){
	var cates = await Category.find();
	res.render('products/create',{cates: cates});
}
module.exports.get = async function(req,res){
	
	var id = req.params.id;
	var products = await Product.find({_id: id});
	var cates = await Category.find();
	res.render('products/detailProduct',
		{ products: products,cates: cates },
		);

}
module.exports.postCreate = async function(req,res){
	
	req.body.pro_image = req.file.path.split('\\').slice(1).join('/');
	req.body.popular = Boolean(req.body.popular);
	if(req.body.quantity > 0)
	{
		req.body.status = true;
	}else req.body.status = false;
	console.log(req.body);
	await Product.insertMany(req.body);
	res.redirect('/products');
}
