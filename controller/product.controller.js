var Product = require('../models/product.model')
// var shortid = require('shortid');
module.exports.index = async function(req,res){
	var products = await Product.find();

	res.render('products/index',{ products: products
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
module.exports.create = function(req,res){
	res.render('products/create');
}
// module.exports.get = function(req,res){
// 	var id = req.params.id;
// 	var users = User.find({_id: id});
// 	res.render('users/detailUser',
// 		{ users: users });
// }
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
